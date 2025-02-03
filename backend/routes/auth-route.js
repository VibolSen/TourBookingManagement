import express from "express";
import {
  signup,
  logout,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  getProfile,
  getUsersByRole,
  editUser,
  deleteUser,
  companyUser,
  handleGoogle,
  showGoogleAuth,
} from "../controllers/auth-controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/signup", upload.single("image"), signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-email", verifyEmail);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", verifyToken, getProfile);
router.get("/users", verifyToken, getUsersByRole);
router.get("/google", showGoogleAuth);
router.get("/callback/google", handleGoogle);
// Route to edit a user
router.put("/users/:userId", editUser); // Use PUT to edit

router.get("/users/:id", companyUser);

// Delete user route
router.delete("/users/:id", deleteUser); // Use DELETE to remove

// router.put("/profile", verifyToken, updateProfile);

router.get("/check-auth", verifyToken, checkAuth);
export default router;
