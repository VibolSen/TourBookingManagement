"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    tour: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Tour",
        required: true,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    // packageName: {
    //   type: String,
    //   required: true,
    // },
    members: {
        type: Number,
        required: true,
        min: 1, // Ensure at least 1 member is specified
    },
    dateOrder: {
        type: Date,
        default: Date.now, // Default to the current date and time
    },
    time: {
        type: String,
        default: () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`; // Default to the current time in "HH:MM" format
        },
    },
    day: {
        type: String,
        default: () => {
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            const now = new Date();
            return days[now.getDay()]; // Default to the current day of the week
        },
    },
    months: {
        type: String,
        default: function () {
            const date = this.dateOrder || new Date(); // Use `dateOrder` or default to now
            const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            // Add the ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
            const ordinalSuffix = day === 1 || day === 21 || day === 31
                ? "st"
                : day === 2 || day === 22
                    ? "nd"
                    : day === 3 || day === 23
                        ? "rd"
                        : "th";
            return `${month} ${day}${ordinalSuffix}, ${year}`;
        },
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    approvedBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
});
exports.Booking = mongoose_1.default.model("Booking", BookingSchema);
