"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controllers_js_1 = require("../controllers/admin-controllers.js"); // Adjust path as needed
const router = express_1.default.Router();
// Admin login
router.post("/login", admin_controllers_js_1.loginAdmin);
// Get all users and subadmins for a given admin
router.get("/:adminId", admin_controllers_js_1.getAdminUsers);
// Create a new admin
router.post("/", admin_controllers_js_1.createAdmin);
router.get("/get-admin/:id", admin_controllers_js_1.getAdminById);
// Update user or subadmin
router.put("/:adminId/user/:userId", admin_controllers_js_1.updateUserOrSubAdmin);
// Delete user or subadmin
router.delete("/:adminId/user/:userId", admin_controllers_js_1.deleteUserOrSubAdmin);
exports.default = router;
