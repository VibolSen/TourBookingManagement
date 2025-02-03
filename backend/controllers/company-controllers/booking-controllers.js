import { Booking } from "../../model/bookingTour.js";
import { Tour } from "../../model/packageTour.js";
import { User } from "../../model/user.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from URL
    const { tour, company, members, dateOrder, time } = req.body; // Extract fields from request body

    // Validate input
    if (!tour || !userId || !company) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if the tour and user exist
    const tourExists = await Tour.findById(tour); // Find the tour by ID
    const userExists = await User.findById(userId); // Find the user by ID
    const subAdmin = await User.findById(company); // Find the sub-admin by company ID

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
    const booking = new Booking({
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking.", error: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tour", "name price") // Populate tour details
      .populate("user", "name email"); // Populate user details

    res.status(200).json({ bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings.", error: error.message });
  }
};

// Get a single booking by ID
export const getBookingsBySubadmin = async (req, res) => {
  try {
    const { subadminId } = req.params; // Extract subadmin ID from URL

    // Check if the subadmin exists
    const subadminExists = await User.findById(subadminId);
    if (!subadminExists || subadminExists.role !== "subadmin") {
      return res.status(404).json({ message: "Subadmin not found." });
    }

    // Fetch all bookings approved by the subadmin
    const bookings = await Booking.find({ approvedBy: subadminId })
      .populate("tour", "name price startDate endDate duration") // Populate tour details
      .populate("user", "name email "); // Populate user details

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this subadmin." });
    }

    // Send the response with the bookings
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings by subadmin.",
      error: error.message,
    });
  }
};

// Update a booking (e.g., change status)
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedBy } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Update status and approvedBy fields
    if (status) booking.status = status;
    if (approvedBy) booking.approvedBy = approvedBy;

    await booking.save();

    res.status(200).json({ message: "Booking updated successfully!", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking.", error: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking.", error: error.message });
  }
};

// Get total bookings and total pending bookings
export const getBookingStatisticsByCompanyId = async (req, res) => {
  try {
    const { id } = req.params; // Extract company ID from the URL

    // Check if the company exists
    const company = await User.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    // Fetch all bookings approved by this company
    const bookings = await Booking.find({ approvedBy: id });

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this company." });
    }

    // Calculate statistics for the company
    const totalBookings = bookings.length;
    const totalPendingBookings = bookings.filter(
      (booking) => booking.status === "pending"
    ).length;

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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking statistics by company.",
      error: error.message,
    });
  }
};

export const getBookingsByApprovedBy = async (req, res) => {
  try {
    const { approvedBy } = req.query; // Extract the company ID from query params

    // Check if the company exists
    const company = await User.findById(approvedBy);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    // Fetch bookings approved by this company
    const bookings = await Booking.find({ approvedBy });

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
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings by company.",
      error: error.message,
    });
  }
};
