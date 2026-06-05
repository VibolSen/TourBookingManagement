"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tourSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    PackageDescription: { type: String, required: true },
    DescriptionTip: { type: String, required: false }, // Ti
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in days or hours, depending on your use case
    maxGroupSize: { type: Number, required: true },
    category: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    location: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    status: { type: String, required: true, default: "Active" },
    mainImage: { type: String, required: true }, // URL or file path
    galleryImages: { type: [String], default: [] }, // Array of URLs or file paths
    startDate: { type: Date, required: true }, // Start date for the tour
    endDate: { type: Date, required: true }, // End date for the tour
    company: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User", // Reference to the Company model
        required: true, // Assuming every tour must belong to a company
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});
const Tour = mongoose_1.default.model("Tour", tourSchema);
exports.Tour = Tour;
exports.default = Tour;
