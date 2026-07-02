const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const listings = await prisma.listing.findMany();
  console.log(listings.map(l => l.id));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());