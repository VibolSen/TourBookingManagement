"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const email = "vibolsen2002@gmail.com";
    const password = "Vibol2020";
    const name = "System Administrator";
    // The backend code contains hardcoded references pointing to this specific Admin ID
    const hardcodedAdminId = "67824394c37fb65437da2bd6";
    console.log("Seeding default admin...");
    // Clean up any existing system admin documents to avoid duplication conflicts
    await prisma.user.deleteMany({
        where: {
            OR: [
                { id: hardcodedAdminId },
                { email },
                { email: "admin@tourbooking.com" }
            ]
        }
    });
    await prisma.admin.deleteMany({
        where: {
            OR: [
                { email },
                { email: "admin@tourbooking.com" }
            ]
        }
    });
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // 1. Create Admin document
    const adminDoc = await prisma.admin.create({
        data: {
            name,
            email,
            password: hashedPassword,
            users: [],
            subAdmins: [],
            userCount: 0,
            subAdminCount: 0
        }
    });
    // 2. Create User document linked to the Admin document and the hardcoded ID
    await prisma.user.create({
        data: {
            id: hardcodedAdminId,
            name,
            email,
            password: hashedPassword,
            role: "admin",
            status: "approved",
            isVerified: true,
            adminId: adminDoc.id
        }
    });
    console.log("----------------------------------------");
    console.log("Default Admin Account Seeded Successfully!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Hardcoded ID: ${hardcodedAdminId}`);
    console.log("----------------------------------------");
}
main()
    .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
