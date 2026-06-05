"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supplyPartnerSchema = new mongoose_1.default.Schema({
    businessDescription: { type: String, required: true },
    numberOfCompanies: { type: String, required: true },
    numberOfActivities: { type: String, required: true },
    location: { type: String, required: true },
    useReservation: { type: String, required: true },
    companyName: { type: String },
    websiteLink: { type: String },
    companyFrom: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    agreedToTerms: { type: Boolean, required: true },
    role: { type: String, default: 'Company' },
});
const SupplyPartner = mongoose_1.default.models.SupplyPartner || mongoose_1.default.model('SupplyPartner', supplyPartnerSchema);
exports.default = SupplyPartner;
