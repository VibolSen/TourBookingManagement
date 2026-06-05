"use strict";
// filepath: /d:/Rupp_ITE_A1-B/New folder (2)/BookingTour-senghorng/BookingTour-senghorng/backend/controllers/location-controller.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.getLocations = void 0;
const location_js_1 = require("../model/location.js");
// Get all locations
const getLocations = async (req, res) => {
    try {
        const locations = await location_js_1.Location.find();
        res.status(200).json({ success: true, locations });
    }
    catch (error) {
        console.log("Error fetching locations", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.getLocations = getLocations;
// Get a single location by ID
const getLocationById = async (req, res) => {
    try {
        const location = await location_js_1.Location.findById(req.params.id);
        if (!location) {
            return res
                .status(404)
                .json({ success: false, message: "Location not found" });
        }
        res.status(200).json({ success: true, location });
    }
    catch (error) {
        console.log("Error fetching location", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.getLocationById = getLocationById;
// Create a new location
const createLocation = async (req, res) => {
    try {
        const { nameLocation, status } = req.body;
        if (!nameLocation || !status) {
            return res.status(400).json({
                success: false,
                message: "All required fields (nameLocation, status) must be provided.",
            });
        }
        const newLocation = new location_js_1.Location({ nameLocation, status });
        await newLocation.save();
        res.status(201).json({
            success: true,
            message: "Location created successfully",
            location: newLocation,
        });
    }
    catch (error) {
        console.error("Error creating location:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.createLocation = createLocation;
// Update a location by ID
const updateLocation = async (req, res) => {
    try {
        const { nameLocation, state } = req.body;
        const location = await location_js_1.Location.findByIdAndUpdate(req.params.id, { nameLocation, state }, { new: true, runValidators: true });
        if (!location) {
            return res
                .status(404)
                .json({ success: false, message: "Location not found" });
        }
        res.status(200).json({ success: true, location });
    }
    catch (error) {
        console.log("Error updating location", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateLocation = updateLocation;
// Delete a location by ID
const deleteLocation = async (req, res) => {
    try {
        // Attempt to find and delete the location by its ID
        const location = await location_js_1.Location.findByIdAndDelete(req.params.id);
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
    }
    catch (error) {
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
exports.deleteLocation = deleteLocation;
