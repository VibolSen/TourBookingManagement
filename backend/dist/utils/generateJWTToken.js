"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWTToken = (res, userId, role) => {
    const token = jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expiry time
    });
    // Set the token in a cookie
    res.cookie("token", token, {
        httpOnly: true, // Cookie can't be accessed by client-side JS
        secure: process.env.NODE_ENV === "production", // Secure cookie for HTTPS in production
        sameSite: "strict", // Cookie will only be set on the same site
        maxAge: 7 * 24 * 60 * 60 * 1000, // Token expiration time (7 days)
    });
    return token;
};
exports.generateJWTToken = generateJWTToken;
