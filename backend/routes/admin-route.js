import express from "express";
import {
  loginAdmin,
  getAdminUsers,
  createAdmin,
  getAdminById,
  updateUserOrSubAdmin,
  deleteUserOrSubAdmin,
} from "../controllers/admin-controllers.js"; // Adjust path as needed

const router = express.Router();

// Admin login
router.post("/login", loginAdmin);

// Get all users and subadmins for a given admin
router.get("/:adminId", getAdminUsers);

// Create a new admin
router.post("/", createAdmin);

router.get("/get-admin/:id", getAdminById);

// Update user or subadmin
router.put("/:adminId/user/:userId", updateUserOrSubAdmin);

// Delete user or subadmin
router.delete("/:adminId/user/:userId", deleteUserOrSubAdmin);

export default router;
