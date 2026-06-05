import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsBySubadmin,
  updateBooking,
  deleteBooking,
  getBookingStatisticsByCompanyId,
  getBookingsByApprovedBy,
} from "../../controllers/company-controllers/booking-controllers.js";

const router = express.Router();

// Create a new booking
router.post("/:userId", createBooking);

// Get all bookings
router.get("/:id", getAllBookings);

// Get a single booking by ID
router.get("/subadmin/:subadminId", getBookingsBySubadmin);

// Update a booking
router.put("/:id", updateBooking);

// Delete a booking
router.delete("/:id", deleteBooking);

router.get("/", getBookingsByApprovedBy);

// New route for booking statistics
router.get("/statistics/totals/:id", getBookingStatisticsByCompanyId);

export default router;
