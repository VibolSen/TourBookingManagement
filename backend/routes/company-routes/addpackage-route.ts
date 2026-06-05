import express from "express";
import {
  createTour,
  getToursBySubadminId,
  getTourById,
  updateTour,
  deleteTour,
  // getUpcomingTours,
  getAllTours,
  getTotalTours,
  getUpcomingToursBySubadminId,
  getToursByDateRange,
} from "../../controllers/company-controllers/addpaackage-controllers.js";

const router = express.Router();

// Routes for subadmins
router.post("/:id/add", createTour);
// router.get("/my-tours", getToursBySubadmin);
router.put("/:subadminId/:id", updateTour);
// Delete a tour by ID
router.delete("/:subadminId/:id", deleteTour);
// // Get upcoming tours
// router.get("/:subadminId/upcoming", getUpcomingTours);

// // Get tours by subadminId
router.get("/upcoming/:id", getUpcomingToursBySubadminId);

// // Get tours within a date range
router.get("/date-range", getToursByDateRange);

// Routes for admins
router.get("/by-subadmin/:subadminId", getToursBySubadminId);

router.get("/total", getTotalTours);

// Routes for all users
router.get("/:id", getTourById);
router.get("/", getAllTours); // Fetch all tours

export default router;
