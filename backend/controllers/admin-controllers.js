import { Admin } from "../model/admin.js"; // Import Admin model
import { User } from "../model/user.js"; // Import User model
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For JWT token generation
import mongoose from "mongoose";

// JWT token generation function
const generateJWTToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// Login an admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
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
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get all users and subadmins for a given admin
export const getAdminUsers = async (req, res) => {
  const { adminId } = req.params;

  try {
    // Find the admin by adminId and populate the users and subAdmins fields
    const admin = await Admin.findById(adminId)
      .populate("users", "name email status role") // Populate user details (exclude password)
      .populate("subAdmins", "name email status role"); // Populate subAdmin details (exclude password)

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
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// Create a new admin
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new Admin({
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
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// Update user or subadmin
export const updateUserOrSubAdmin = async (req, res) => {
  const { adminId, userId } = req.params;
  const { name, email, status, role } = req.body;

  try {
    // Validate adminId and userId
    if (
      !mongoose.Types.ObjectId.isValid(adminId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin or user ID format",
      });
    }

    // Find the admin and user
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Track the previous role
    const previousRole = user.role;

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;
    if (status) user.status = status;
    if (role) user.role = role;

    // Save the updated user
    await user.save();

    // Handle role change logic
    if (role && role !== previousRole) {
      if (previousRole === "user" && role === "subadmin") {
        // Move user from users array to subAdmins array
        admin.users = admin.users.filter(
          (id) => id.toString() !== userId.toString()
        );
        admin.subAdmins.push(userId);
        admin.userCount -= 1;
        admin.subAdminCount += 1;
      } else if (previousRole === "subadmin" && role === "user") {
        // Move user from subAdmins array to users array
        admin.subAdmins = admin.subAdmins.filter(
          (id) => id.toString() !== userId.toString()
        );
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
  } catch (error) {
    console.error("Error updating user or subadmin:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// Delete user or subadmin
export const deleteUserOrSubAdmin = async (req, res) => {
  const { adminId, userId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
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
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User or subadmin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user or subadmin:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};
export const getAdminById = async (req, res) => {
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
    const admin = await Admin.findById(id);
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
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
