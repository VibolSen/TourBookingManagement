"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controllers_js_1 = require("../../controllers/company-controllers/booking-controllers.js");
const router = express_1.default.Router();
// Create a new booking
router.post("/:userId", booking_controllers_js_1.createBooking);
// Get all bookings
router.get("/:id", booking_controllers_js_1.getAllBookings);
// Get a single booking by ID
router.get("/subadmin/:subadminId", booking_controllers_js_1.getBookingsBySubadmin);
// Update a booking
router.put("/:id", booking_controllers_js_1.updateBooking);
// Delete a booking
router.delete("/:id", booking_controllers_js_1.deleteBooking);
router.get("/", booking_controllers_js_1.getBookingsByApprovedBy);
// New route for booking statistics
router.get("/statistics/totals/:id", booking_controllers_js_1.getBookingStatisticsByCompanyId);
exports.default = router;
