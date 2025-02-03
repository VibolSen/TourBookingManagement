// filepath: /d:/Rupp_ITE_A1-B/New folder (2)/BookingTour-senghorng/BookingTour-senghorng/backend/controllers/location-controller.js

import { Location } from "../model/location.js";

// Get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json({ success: true, locations });
  } catch (error) {
    console.log("Error fetching locations", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single location by ID
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }
    res.status(200).json({ success: true, location });
  } catch (error) {
    console.log("Error fetching location", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Create a new location
export const createLocation = async (req, res) => {
  try {
 const { nameLocation, status } = req.body;
    if (!nameLocation || !status) {
      return res.status(400).json({
        success: false,
        message: "All required fields (nameLocation, status) must be provided.",
      });
    }

    const newLocation = new Location({ nameLocation, status });
    await newLocation.save();

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      location: newLocation,
    });
  } catch (error) {
    console.error("Error creating location:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update a location by ID
export const updateLocation = async (req, res) => {
  try {
    const { nameLocation, state } = req.body;
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { nameLocation, state },
      { new: true, runValidators: true }
    );
    if (!location) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }
    res.status(200).json({ success: true, location });
  } catch (error) {
    console.log("Error updating location", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a location by ID
export const deleteLocation = async (req, res) => {
  try {
    // Attempt to find and delete the location by its ID
    const location = await Location.findByIdAndDelete(req.params.id);

    // If the location is not found, return a 404 status with an appropriate message
    if (!location) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }

    // If location is deleted successfully, return a success response
    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    // Log the error to the server's console for debugging
    console.error("Error deleting location:", error);

    // Return a 500 error if something goes wrong with the delete operation
    res.status(500).json({
      success: false,
      message: "Internal Server Error: Unable to delete location",
      error: error.message,
    });
  }
};
