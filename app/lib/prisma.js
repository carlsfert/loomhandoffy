import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis;

function createPrismaClient() {
  // Strip Prisma-specific ?schema=public param — pg driver doesn't understand it
  let connStr = process.env.DATABASE_URL || "";
  const url = new URL(connStr);
  url.searchParams.delete("schema");
  // Ensure SSL for RDS
  if (!url.searchParams.has("sslmode")) {
    url.searchParams.set("sslmode", "require");
  }
  connStr = url.toString();

  const adapter = new PrismaPg({ connectionString: connStr });
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
