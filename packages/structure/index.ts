import * as zod from "./zod/";
import { PrismaClient, Prisma } from "@prisma/client";

const prismaClient = new PrismaClient();

const structure = {
  zod,
  prismaClient,
  prisma: Prisma,
};

export default structure;
