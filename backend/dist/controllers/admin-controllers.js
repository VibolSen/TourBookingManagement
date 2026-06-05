"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminById = exports.deleteUserOrSubAdmin = exports.updateUserOrSubAdmin = exports.createAdmin = exports.getAdminUsers = exports.loginAdmin = void 0;
const admin_js_1 = require("../model/admin.js"); // Import Admin model
const user_js_1 = require("../model/user.js"); // Import User model
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For password hashing
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For JWT token generation
const mongoose_1 = __importDefault(require("mongoose"));
// JWT token generation function
const generateJWTToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
    });
};
// Login an admin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the admin by email
        const admin = await admin_js_1.Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcryptjs_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Generate a JWT token
        const token = generateJWTToken(admin._id, admin.role);
        // Respond with the token and admin details (excluding the password)
        res.status(200).json({
            token,
            user: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
exports.loginAdmin = loginAdmin;
// Get all users and subadmins for a given admin
const getAdminUsers = async (req, res) => {
    const { adminId } = req.params;
    try {
        // Find the admin by adminId and populate the users and subAdmins fields
        let admin = await admin_js_1.Admin.findById(adminId)
            .populate("users", "name email status role") // Populate user details (exclude password)
            .populate("subAdmins", "name email status role"); // Populate subAdmin details (exclude password)
        if (!admin) {
            // Fallback: Check if it's a User ID with the admin role
            const userDoc = await user_js_1.User.findById(adminId);
            if (userDoc && userDoc.role === "admin") {
                admin = await admin_js_1.Admin.findOne({ email: userDoc.email })
                    .populate("users", "name email status role")
                    .populate("subAdmins", "name email status role");
            }
        }
        if (!admin) {
            return res
                .status(404)
                .json({ success: false, message: "Admin not found" });
        }
        // Count users and subAdmins
        const userCount = admin.users.length;
        const subAdminCount = admin.subAdmins.length;
        // Send the response with users, subAdmins, and their counts
        res.status(200).json({
            success: true,
            users: admin.users,
            subAdmins: admin.subAdmins,
            counts: {
                users: userCount,
                subAdmins: subAdminCount,
            },
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error. Please try again." });
    }
};
exports.getAdminUsers = getAdminUsers;
// Create a new admin
const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if admin already exists
        const existingAdmin = await admin_js_1.Admin.findOne({ email });
        if (existingAdmin) {
            return res
                .status(400)
                .json({ success: false, message: "Admin already exists" });
        }
        // Hash the password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create a new admin
        const newAdmin = new admin_js_1.Admin({
            name,
            email,
            password: hashedPassword, // Save the hashed password
        });
        // Save the admin to the database
        await newAdmin.save();
        // Respond with the created admin details (exclude sensitive data)
        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
            },
        });
    }
    catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
exports.createAdmin = createAdmin;
// Update user or subadmin
const updateUserOrSubAdmin = async (req, res) => {
    const { adminId, userId } = req.params;
    const { name, email, status, role } = req.body;
    try {
        // Validate adminId and userId
        if (!mongoose_1.default.Types.ObjectId.isValid(adminId) ||
            !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid admin or user ID format",
            });
        }
        // Find the admin and user
        let admin = await admin_js_1.Admin.findById(adminId);
        if (!admin) {
            // Fallback: Check if it's a User ID with the admin role
            const userDoc = await user_js_1.User.findById(adminId);
            if (userDoc && userDoc.role === "admin") {
                admin = await admin_js_1.Admin.findOne({ email: userDoc.email });
            }
        }
        if (!admin) {
            return res
                .status(404)
                .json({ success: false, message: "Admin not found" });
        }
        const user = await user_js_1.User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        // Track the previous role
        const previousRole = user.role;
        // Update user details
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (status)
            user.status = status;
        if (role)
            user.role = role;
        // Save the updated user
        await user.save();
        // Handle role change logic
        if (role && role !== previousRole) {
            if (previousRole === "user" && role === "subadmin") {
                // Move user from users array to subAdmins array
                admin.users = admin.users.filter((id) => id.toString() !== userId.toString());
                admin.subAdmins.push(userId);
                admin.userCount -= 1;
                admin.subAdminCount += 1;
            }
            else if (previousRole === "subadmin" && role === "user") {
                // Move user from subAdmins array to users array
                admin.subAdmins = admin.subAdmins.filter((id) => id.toString() !== userId.toString());
                admin.users.push(userId);
                admin.subAdminCount -= 1;
                admin.userCount += 1;
            }
        }
        // Save the updated admin
        await admin.save();
        // Respond with updated user and counts
        res.status(200).json({
            success: true,
            message: `User role updated to ${role}`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            counts: {
                users: admin.userCount,
                subAdmins: admin.subAdminCount,
            },
        });
    }
    catch (error) {
        console.error("Error updating user or subadmin:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error. Please try again." });
    }
};
exports.updateUserOrSubAdmin = updateUserOrSubAdmin;
// Delete user or subadmin
const deleteUserOrSubAdmin = async (req, res) => {
    const { adminId, userId } = req.params;
    try {
        let admin = await admin_js_1.Admin.findById(adminId);
        if (!admin) {
            // Fallback: Check if it's a User ID with the admin role
            const userDoc = await user_js_1.User.findById(adminId);
            if (userDoc && userDoc.role === "admin") {
                admin = await admin_js_1.Admin.findOne({ email: userDoc.email });
            }
        }
        if (!admin) {
            return res
                .status(404)
                .json({ success: false, message: "Admin not found" });
        }
        // Remove user or subadmin from admin's list
        admin.users = admin.users.filter((id) => id.toString() !== userId);
        admin.subAdmins = admin.subAdmins.filter((id) => id.toString() !== userId);
        await admin.save();
        // Delete the user or subadmin document
        await user_js_1.User.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            message: "User or subadmin deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting user or subadmin:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error. Please try again." });
    }
};
exports.deleteUserOrSubAdmin = deleteUserOrSubAdmin;
const getAdminById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL path
        // Validate the ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }
        // Find the admin by ID
        let admin = await admin_js_1.Admin.findById(id);
        if (!admin) {
            // Fallback: Check if it's a User ID with the admin role
            const userDoc = await user_js_1.User.findById(id);
            if (userDoc && userDoc.role === "admin") {
                admin = await admin_js_1.Admin.findOne({ email: userDoc.email });
            }
        }
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }
        console.log("Requested ID:", id);
        console.log("Query result:", admin);
        // Exclude sensitive data like the password
        res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    }
    catch (error) {
        console.error("Error fetching admin by ID:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
exports.getAdminById = getAdminById;
