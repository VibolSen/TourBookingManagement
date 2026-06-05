"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /d:/Rupp_ITE_A1-B/New folder (2)/BookingTour-senghorng/BookingTour-senghorng/backend/routes/location-route.js
const express_1 = __importDefault(require("express"));
const location_controller_js_1 = require("../controllers/location-controller.js");
const router = express_1.default.Router();
router.get("/", location_controller_js_1.getLocations);
router.get("/:id", location_controller_js_1.getLocationById);
router.post("/createlocation", location_controller_js_1.createLocation);
router.put("/:id", location_controller_js_1.updateLocation);
router.delete("/:id", location_controller_js_1.deleteLocation);
exports.default = router;
