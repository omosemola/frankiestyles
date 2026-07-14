import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

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
          // Replace sslenable=false with sslmode=disable for pg driver compliance
          return decoded.databaseUrl.replace('sslenable=false', 'sslmode=disable');
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
  max: 2,                  // Allow slightly more connections for concurrent developer requests
  idleTimeoutMillis: 30000, // Keep connection open for 30s to enable reuse and avoid handshake churn
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
