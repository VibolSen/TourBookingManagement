"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const policySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true }, // e.g., "Privacy Policy", "Cancellation Policy"
    description: { type: String, required: true }, // Detailed content of the policy
    // When the policy comes into effect
    createdBy: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true }, // Admin/Sub-admin who created it
    isActive: { type: Boolean, default: true }, // To manage active/inactive policies
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});
const Policy = mongoose_1.default.model("Policy", policySchema);
exports.default = Policy;
