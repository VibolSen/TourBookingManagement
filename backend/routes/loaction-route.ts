// filepath: /d:/Rupp_ITE_A1-B/New folder (2)/BookingTour-senghorng/BookingTour-senghorng/backend/routes/location-route.js
import express from "express";
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/location-controller.js";

const router = express.Router();

router.get("/", getLocations);
router.get("/:id", getLocationById);
router.post("/createlocation", createLocation);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;
