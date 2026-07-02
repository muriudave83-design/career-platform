const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.bookmark.deleteMany();
  console.log("Bookmarks cleared");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());