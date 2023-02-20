import { PrismaClient } from "@prisma/client";
import structure from "..";
import authorSeed from "./Author";
import bookSeed from "./Book";

const client = new PrismaClient();

const main = async () => {
    return await client.$transaction([
        ...authorSeed(),
        ...bookSeed(),
    ])
};

main()
  .then(async (res) => {
    console.log(res);
    const hoge = await client.author.findFirst().books();
    console.log(hoge);
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
