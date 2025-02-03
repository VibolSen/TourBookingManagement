import { Tour } from "../../model/packageTour.js";
import { User } from "../../model/user.js";

// Create a new tour

export const createTour = async (req, res) => {
  try {
    const {
      name,
      description,
      PackageDescription,
      price,
      duration,
      maxGroupSize,
      category,
      location,
      company,
      mainImage,
      DescriptionTip,
      galleryImages,
      startDate,
      endDate,
    } = req.body;

    // Get the subadmin ID from the URL parameter
    const subAdminId = req.params.id;

    // Validate role
    const subAdmin = await User.findById(subAdminId);

    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res
        .status(403)
        .json({ message: "Only subadmins can create tours." });
    }

    // Create the tour
    const newTour = new Tour({
      name,
      description,
      PackageDescription,
      price,
      duration,
      maxGroupSize,
      category,
      location,
      company: subAdminId, // Ensure this refers to the correct company/user
      mainImage,
      galleryImages,
      DescriptionTip,
      startDate,
      endDate,
    });

    // Save the new tour to the database
    await newTour.save();
    res
      .status(201)
      .json({ message: "Tour created successfully", tour: newTour });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating tour", error: error.message });
  }
};

// Get all tours created by the logged-in subadmin
// export const getToursBySubadmin = async (req, res) => {
//   try {
//     if (req.user.role !== "subadmin") {
//       return res
//         .status(403)
//         .json({ message: "Only subadmins can access their tours." });
//     }

//     const tours = await Tour.find({ company: req.user._id }).populate(
//       "category location"
//     );

//     if (!tours.length) {
//       return res
//         .status(404)
//         .json({ message: "No tours found for this subadmin." });
//     }

//     res.status(200).json({ tours });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching tours", error: error.message });
//   }
// };

// Admin fetching tours by a specific subadmin

// Fetch tours by subadminId
export const getToursBySubadminId = async (req, res) => {
  const { subadminId } = req.params; // Extract subadminId from URL parameters

  try {
    // Fetch tours associated with the subadminId
    const tours = await Tour.find({ company: subadminId }).populate(
      "category location company"
    );

    // If no tours are found, return an empty array
    if (!tours.length) {
      return res
        .status(200)
        .json({ message: "No tours found for this subadmin.", data: [] });
    }

    // Return the fetched tours
    res
      .status(200)
      .json({ message: "Tours fetched successfully", data: tours });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ error: "Failed to fetch tours", details: error.message });
  }
};

// Get a single tour by ID
export const getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id).populate(
      "category location createdBy"
    );

    if (!tour) {
      return res.status(404).json({ message: "Tour not found." });
    }

    res.status(200).json({ tour });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tour", error: error.message });
  }
};

// Update a tour (only for the subadmin who created it)
// Update a tour by ID
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params; // Tour ID
    const subAdminId = req.params.subadminId; // Subadmin ID from URL parameter
    const updateData = req.body; // Data to update

    // Check if the subadmin exists and has the role of "subadmin"
    const subAdmin = await User.findById(subAdminId);

    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res
        .status(403)
        .json({ message: "Only subadmins can update tours." });
    }

    // Find the tour and ensure it belongs to the subadmin
    const tour = await Tour.findOne({ _id: id, company: subAdminId });

    if (!tour) {
      return res
        .status(404)
        .json({ message: "Tour not found or unauthorized." });
    }

    // Update the tour
    const updatedTour = await Tour.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    res
      .status(200)
      .json({ message: "Tour updated successfully", tour: updatedTour });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating tour", error: error.message });
  }
};

// Delete a tour by ID
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params; // Tour ID
    const subAdminId = req.params.subadminId; // Subadmin ID from URL parameter

    // Check if the subadmin exists and has the role of "subadmin"
    const subAdmin = await User.findById(subAdminId);

    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res
        .status(403)
        .json({ message: "Only subadmins can delete tours." });
    }

    // Find the tour and ensure it belongs to the subadmin
    const tour = await Tour.findOne({ _id: id, company: subAdminId });

    if (!tour) {
      return res
        .status(404)
        .json({ message: "Tour not found or unauthorized." });
    }

    // Delete the tour
    await Tour.findByIdAndDelete(id);

    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting tour", error: error.message });
  }
};

// Fetch upcoming tours for a specific subadmin by their ID
export const getUpcomingToursBySubadminId = async (req, res) => {
  try {
    const { id } = req.params; // Extract subadminId (company ID) from URL parameters
    const currentDate = new Date(); // Get the current date and time

    // Check if the company (subadmin) exists
    const company = await User.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company (subadmin) not found." });
    }

    // Find tours where the startDate is greater than the current date and the company matches the subadminId
    const upcomingTours = await Tour.find({
      company: id,
      startDate: { $gt: currentDate },
    }).populate("category location company");

    // If no upcoming tours are found, return an empty array
    if (!upcomingTours.length) {
      return res.status(200).json({
        message: "No upcoming tours found for this subadmin.",
        data: [],
        count: 0, // Optional: Include count for consistency
      });
    }

    // Return the upcoming tours and their count
    res.status(200).json({
      message: "Upcoming tours fetched successfully",
      data: upcomingTours,
      upcommingTour: upcomingTours.length, // Optional: Include count for consistency
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      error: "Failed to fetch upcoming tours",
      details: error.message,
    });
  }
};

export const getToursByDateRange = async (req, res) => {
  const { start, end } = req.query; // Expecting query parameters: start and end
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const tours = await Tour.find({
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    })
      .populate("category location company")
      .sort({ startDate: 1 }); // Sort by start date

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalTours = async (req, res) => {
  try {
    // Count all tours in the database
    const totalTours = await Tour.countDocuments();

    // Return the total count
    res.status(200).json({
      message: "Total tours fetched successfully",
      totalTours,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      error: "Failed to fetch total tours",
      details: error.message,
    });
  }
};


// Get all tours
export const getAllTours = async (req, res) => {
  try {
    // Fetch all tours from the database
    const tours = await Tour.find().populate("category location company");

    // If no tours found, return a message
    if (!tours.length) {
      return res.status(404).json({
        message: "No tours found.",
        data: [],
      });
    }

    // Replace null fields with default values
    const sanitizedTours = tours.map((tour) => ({
      ...tour._doc,
      category: tour.category || { name: "No Category" },
      location: tour.location || { name: "No Location" },
      company: tour.company || { name: "No Company" },
    }));

    // Return the fetched tours
    res.status(200).json({
      message: "Tours fetched successfully",
      data: sanitizedTours,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tours",
      error: error.message,
    });
  }
};
