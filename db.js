const { PrismaClient } = require("@prisma/client");

const globalForPrisma = global;

const prisma = new PrismaClient({
  log: ["error"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

exports.prisma = prisma;
