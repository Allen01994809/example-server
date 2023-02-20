import { PrismaClient } from "@prisma/client";
import structure from "..";
const client = new PrismaClient();
const authorSeeds = [
  {
    id: 1,
    title: 'hoge book title',
    description: 'hogehoge bar buzz',
    authorId: 1,
  },
];

const bookSeed = () => {
  const bookQuery = authorSeeds.map((value) => {
    const result = structure.zod.BookModel.parse(value);
    return client.book.upsert({
      where: { id: result.id },
      update: result,
      create: result,
    });
  });
  return bookQuery;
};

export default bookSeed;