"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addpaackage_controllers_js_1 = require("../../controllers/company-controllers/addpaackage-controllers.js");
const router = express_1.default.Router();
// Routes for subadmins
router.post("/:id/add", addpaackage_controllers_js_1.createTour);
// router.get("/my-tours", getToursBySubadmin);
router.put("/:subadminId/:id", addpaackage_controllers_js_1.updateTour);
// Delete a tour by ID
router.delete("/:subadminId/:id", addpaackage_controllers_js_1.deleteTour);
// // Get upcoming tours
// router.get("/:subadminId/upcoming", getUpcomingTours);
// // Get tours by subadminId
router.get("/upcoming/:id", addpaackage_controllers_js_1.getUpcomingToursBySubadminId);
// // Get tours within a date range
router.get("/date-range", addpaackage_controllers_js_1.getToursByDateRange);
// Routes for admins
router.get("/by-subadmin/:subadminId", addpaackage_controllers_js_1.getToursBySubadminId);
router.get("/total", addpaackage_controllers_js_1.getTotalTours);
// Routes for all users
router.get("/:id", addpaackage_controllers_js_1.getTourById);
router.get("/", addpaackage_controllers_js_1.getAllTours); // Fetch all tours
exports.default = router;
