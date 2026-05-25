import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("🚀 Starting DB test...");

  // 🧹 DELETE insecure user (RUNS SAFELY EVERY TIME)
  await prisma.user.deleteMany({
    where: {
      email: "test@example.com",
    },
  });

  console.log("🧹 Cleaned old insecure user");

  // 🔐 HASH PASSWORD
  const hashedPassword = await bcrypt.hash("123456", 10);

  // 🛑 PREVENT DUPLICATE USER
  const existingUser = await prisma.user.findUnique({
    where: { email: "test2@example.com" },
  });

  let newUser;

  if (!existingUser) {
    newUser = await prisma.user.create({
      data: {
        email: "test2@example.com",
        password: hashedPassword,
        course: "Computer Science",
        location: "UK",
      },
    });

    console.log("✅ Created user:", newUser);
  } else {
    console.log("⚠️ User already exists:", existingUser.email);
  }

  // 📦 FETCH USERS
  const users = await prisma.user.findMany();
  console.log("📦 All users:", users);
}

main()
  .catch((e) => {
    console.error("❌ ERROR:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔚 Done");
  });