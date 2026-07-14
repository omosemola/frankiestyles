import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

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
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export { PrismaPg, Pool };
