"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_js_1 = __importDefault(require("./database/prisma.js"));
async function main() {
    console.log("Checking DB connection...");
    const users = await prisma_js_1.default.user.findMany();
    console.log("Database connection successful. Existing users count:", users.length);
}
main()
    .catch((e) => {
    console.error("Connection failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_js_1.default.$disconnect();
});
