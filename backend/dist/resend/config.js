"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = void 0;
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined in the environment variables");
}
exports.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
