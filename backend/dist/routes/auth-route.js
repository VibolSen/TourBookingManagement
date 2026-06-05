"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_js_1 = require("../controllers/auth-controllers.js");
const verifyToken_js_1 = require("../middleware/verifyToken.js");
const uploadImage_js_1 = __importDefault(require("../middleware/uploadImage.js"));
const router = express_1.default.Router();
router.post("/signup", uploadImage_js_1.default.single("image"), auth_controllers_js_1.signup);
router.post("/login", auth_controllers_js_1.login);
router.post("/logout", auth_controllers_js_1.logout);
router.post("/forgot-password", auth_controllers_js_1.forgotPassword);
router.post("/verify-email", auth_controllers_js_1.verifyEmail);
router.post("/reset-password/:token", auth_controllers_js_1.resetPassword);
router.get("/profile", verifyToken_js_1.verifyToken, auth_controllers_js_1.getProfile);
router.get("/users", verifyToken_js_1.verifyToken, auth_controllers_js_1.getUsersByRole);
router.get("/google", auth_controllers_js_1.showGoogleAuth);
router.get("/callback/google", auth_controllers_js_1.handleGoogle);
// Route to edit a user
router.put("/users/:userId", auth_controllers_js_1.editUser); // Use PUT to edit
router.get("/users/:id", auth_controllers_js_1.companyUser);
// Delete user route
router.delete("/users/:id", auth_controllers_js_1.deleteUser); // Use DELETE to remove
// router.put("/profile", verifyToken, updateProfile);
router.get("/check-auth", verifyToken_js_1.verifyToken, auth_controllers_js_1.checkAuth);
exports.default = router;
