import { PrismaClient } from "@prisma/client";
import structure from "..";
const client = new PrismaClient();
const authorSeeds = [
  {
    id: 1,
    name: "fuga",
  },
  {
    id: 2,
    name: "bar",
  },
  {
    id: 3,
    name: "荒木",
  },
  {
    id: 4,
    name: "荒木 駿輝",
  },
];

const authorSeed = () => {
  const authorsQuery = authorSeeds.map((value) => {
    const result = structure.zod.AuthorModel.parse(value);
    return client.author.upsert({
      where: { id: result.id },
      update: result,
      create: result,
    });
  });
  return authorsQuery;
};

export default authorSeed;