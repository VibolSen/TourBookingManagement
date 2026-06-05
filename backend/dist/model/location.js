"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const locationSchema = new mongoose_1.default.Schema({
    nameLocation: {
        type: String,
        required: true,
    },
    status: { type: String, required: true, default: "Active" },
}, { timestamps: true });
exports.Location = mongoose_1.default.model("Location", locationSchema);
