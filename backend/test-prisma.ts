import prisma from "./database/prisma.js";

async function main() {
  console.log("Checking DB connection...");
  const users = await prisma.user.findMany();
  console.log("Database connection successful. Existing users count:", users.length);
}

main()
  .catch((e) => {
    console.error("Connection failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
