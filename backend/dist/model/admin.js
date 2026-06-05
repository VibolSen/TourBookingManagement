"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin"], // Ensure only "admin" is allowed as a role
    },
    users: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            default: [], // Initialize as empty array
        },
    ],
    subAdmins: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            default: [], // Initialize as empty array
        },
    ],
    userCount: { type: Number, default: 0 }, // Count of users
    subAdminCount: { type: Number, default: 0 }, // Count of subadmins
});
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
