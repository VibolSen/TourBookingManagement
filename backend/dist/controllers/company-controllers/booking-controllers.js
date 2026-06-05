"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsByApprovedBy = exports.getBookingStatisticsByCompanyId = exports.deleteBooking = exports.updateBooking = exports.getBookingsBySubadmin = exports.getAllBookings = exports.createBooking = void 0;
const bookingTour_js_1 = require("../../model/bookingTour.js");
const packageTour_js_1 = require("../../model/packageTour.js");
const user_js_1 = require("../../model/user.js");
// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { userId } = req.params; // Extract user ID from URL
        const { tour, company, members, dateOrder, time } = req.body; // Extract fields from request body
        // Validate input
        if (!tour || !userId || !company) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        // Check if the tour and user exist
        const tourExists = await packageTour_js_1.Tour.findById(tour); // Find the tour by ID
        const userExists = await user_js_1.User.findById(userId); // Find the user by ID
        const subAdmin = await user_js_1.User.findById(company); // Find the sub-admin by company ID
        if (!tourExists) {
            return res.status(404).json({ message: "Tour not found." });
        }
        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!subAdmin) {
            return res
                .status(404)
                .json({ message: "Sub-admin not found for this tour." });
        }
        // Create the booking
        const booking = new bookingTour_js_1.Booking({
            tour,
            user: userId,
            approvedBy: subAdmin._id, // Use sub-admin ID in the booking
            members,
            dateOrder,
            time,
        });
        await booking.save();
        // Prepare the booking response
        const bookingResponse = {
            id: booking._id, // Add the `id` field
            tour: booking.tour,
            user: booking.user,
            approvedBy: booking.approvedBy,
            members: booking.members,
            dateOrder: booking.dateOrder,
            time: booking.time,
        };
        // Send the response including the sub-admin details
        res.status(201).json({
            message: "Booking created successfully!",
            booking: bookingResponse,
            company: {
                id: subAdmin._id, // Correctly use sub-admin's ID
                name: subAdmin.name, // Use sub-admin's name
                email: subAdmin.email, // Use sub-admin's email
                role: subAdmin.role, // Use sub-admin's role
            },
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error creating booking.", error: error.message });
    }
};
exports.createBooking = createBooking;
// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingTour_js_1.Booking.find()
            .populate("tour", "name price") // Populate tour details
            .populate("user", "name email"); // Populate user details
        res.status(200).json({ bookings });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching bookings.", error: error.message });
    }
};
exports.getAllBookings = getAllBookings;
// Get a single booking by ID
const getBookingsBySubadmin = async (req, res) => {
    try {
        const { subadminId } = req.params; // Extract subadmin ID from URL
        // Check if the subadmin exists
        const subadminExists = await user_js_1.User.findById(subadminId);
        if (!subadminExists || subadminExists.role !== "subadmin") {
            return res.status(404).json({ message: "Subadmin not found." });
        }
        // Fetch all bookings approved by the subadmin
        const bookings = await bookingTour_js_1.Booking.find({ approvedBy: subadminId })
            .populate("tour", "name price startDate endDate duration") // Populate tour details
            .populate("user", "name email "); // Populate user details
        if (!bookings || bookings.length === 0) {
            return res
                .status(404)
                .json({ message: "No bookings found for this subadmin." });
        }
        // Send the response with the bookings
        res.status(200).json({ bookings });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching bookings by subadmin.",
            error: error.message,
        });
    }
};
exports.getBookingsBySubadmin = getBookingsBySubadmin;
// Update a booking (e.g., change status)
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, approvedBy } = req.body;
        const booking = await bookingTour_js_1.Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        // Update status and approvedBy fields
        if (status)
            booking.status = status;
        if (approvedBy)
            booking.approvedBy = approvedBy;
        await booking.save();
        res.status(200).json({ message: "Booking updated successfully!", booking });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error updating booking.", error: error.message });
    }
};
exports.updateBooking = updateBooking;
// Delete a booking
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingTour_js_1.Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        res.status(200).json({ message: "Booking deleted successfully!" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting booking.", error: error.message });
    }
};
exports.deleteBooking = deleteBooking;
// Get total bookings and total pending bookings
const getBookingStatisticsByCompanyId = async (req, res) => {
    try {
        const { id } = req.params; // Extract company ID from the URL
        // Check if the company exists
        const company = await user_js_1.User.findById(id);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        // Fetch all bookings approved by this company
        const bookings = await bookingTour_js_1.Booking.find({ approvedBy: id });
        if (!bookings || bookings.length === 0) {
            return res
                .status(404)
                .json({ message: "No bookings found for this company." });
        }
        // Calculate statistics for the company
        const totalBookings = bookings.length;
        const totalPendingBookings = bookings.filter((booking) => booking.status === "pending").length;
        // Send the response
        res.status(200).json({
            message: "Booking statistics fetched successfully.",
            company: {
                id: company._id,
                name: company.name,
                email: company.email,
                role: company.role,
            },
            statistics: {
                totalBookings,
                totalPendingBookings,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching booking statistics by company.",
            error: error.message,
        });
    }
};
exports.getBookingStatisticsByCompanyId = getBookingStatisticsByCompanyId;
const getBookingsByApprovedBy = async (req, res) => {
    try {
        const { approvedBy } = req.query; // Extract the company ID from query params
        // Check if the company exists
        const company = await user_js_1.User.findById(approvedBy);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        // Fetch bookings approved by this company
        const bookings = await bookingTour_js_1.Booking.find({ approvedBy });
        if (!bookings || bookings.length === 0) {
            return res
                .status(404)
                .json({ message: "No bookings found for this company." });
        }
        // Send the response
        res.status(200).json({
            message: "Bookings fetched successfully.",
            bookings,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching bookings by company.",
            error: error.message,
        });
    }
};
exports.getBookingsByApprovedBy = getBookingsByApprovedBy;
