import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis;

function createPrismaClient() {
  let connStr = process.env.DATABASE_URL || "";

  if (connStr) {
    // Strip Prisma-specific ?schema=public param — pg driver doesn't understand it
    const url = new URL(connStr);
    url.searchParams.delete("schema");
    connStr = url.toString();
  }

  // First arg is pg.PoolConfig — ssl goes at the top level
  const adapter = new PrismaPg({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false },
  });
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
