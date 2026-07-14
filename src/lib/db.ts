import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dns from 'dns';

// Force Node to prioritize IPv4 address resolution for localhost on Windows
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

// Cache connection objects on global in development to prevent hot-reload connection leaks
const globalForDb = global as unknown as {
  pool: Pool | undefined;
  adapter: PrismaPg | undefined;
  prisma: PrismaClient | undefined;
};

function getDirectConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  
  if (url.startsWith('prisma+postgres://')) {
    try {
      const urlObj = new URL(url);
      const apiKey = urlObj.searchParams.get('api_key');
      if (apiKey) {
        const decoded = JSON.parse(Buffer.from(apiKey, 'base64').toString('utf-8'));
        if (decoded.databaseUrl) {
          // Replace localhost with 127.0.0.1 to bypass Windows IPv6 resolution issues,
          // and template1 with postgres to connect to the correct database where tables exist.
          return decoded.databaseUrl
            .replace('localhost:51214', '127.0.0.1:51214')
            .replace('/template1', '/postgres');
        }
      }
    } catch (e) {
      console.warn("Failed to decode prisma+postgres URL, falling back to raw url", e);
    }
  }
  return url;
}

const connectionString = getDirectConnectionString();

// Retrieve or create singleton pg Pool, adapter and prisma client
export const pool = globalForDb.pool || new Pool({ 
  connectionString,
  max: 1,                  // Limit to 1 connection to prevent exceeding postgres proxy limit of 10
  idleTimeoutMillis: 1,    // Close idle connections immediately to prevent stale socket reuse
  connectionTimeoutMillis: 5000 // Reject hung connections after 5 seconds
});

export const adapter = globalForDb.adapter || new PrismaPg(pool);

export const prisma = globalForDb.prisma || new PrismaClient({
  adapter,
  log: ['query'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
  globalForDb.adapter = adapter;
  globalForDb.prisma = prisma;
}

export { PrismaPg, Pool };
