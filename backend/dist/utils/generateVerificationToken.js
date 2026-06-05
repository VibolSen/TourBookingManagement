"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationToken = void 0;
const generateVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString();
exports.generateVerificationToken = generateVerificationToken;
