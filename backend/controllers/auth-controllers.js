import { User } from "../model/user.js";
import { Admin } from "../model/admin.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../utils/generateJWTToken.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../resend/email.js";
import crypto from "crypto";
import { createCanvas } from "canvas";
import path from "path";
import fs from "fs";
import axios from "axios";

// Signup function

export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    adminId, // Optional for users or subadmins
    status: requestedStatus,
    role: requestedRole,
  } = req.body;

  // Define the fixed admin ID
  const allowedIDadmin = "67824394c37fb65437da2bd6";
  // Define allowed roles and statuses
  const allowedRoles = ["user", "admin", "subadmin"];
  const allowedStatuses = ["pending", "approved", "rejected"];

  // Validate role and status
  const role = allowedRoles.includes(requestedRole) ? requestedRole : "user";
  const status = allowedStatuses.includes(requestedStatus)
    ? requestedStatus
    : "pending";

  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      adminId: role === "user" || role === "subadmin" ? allowedIDadmin : null,
    });

    // Save the user to the database
    await user.save();

    // Handle admin-specific actions
    if (role === "admin") {
      const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
        users: [],
        subAdmins: [],
      });

      await newAdmin.save();
      user.adminId = newAdmin._id; // Link the user to their admin record
      await user.save();
    } else if (role === "user" || role === "subadmin") {
      const admin = await Admin.findById(allowedIDadmin);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found. Check the predefined admin ID.",
        });
      }

      if (role === "user") {
        admin.users.push(user._id);
      } else if (role === "subadmin") {
        admin.subAdmins.push(user._id);
      }
      await admin.save();
    }

    // Generate JWT token and send a verification email
    generateJWTToken(res, user._id, user.role);
    await sendVerificationEmail(user.email, verificationToken);

    // Send the final response
    return res.status(201).json({
      success: true,
      message: "User created successfully and linked to the admin.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle duplicate key error for email or googleId
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// Function to generate profile image
const generateProfileImage = (name) => {
  const initials = name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")
    .slice(0, 2); // Limit to 2 letters

  const hash = crypto.createHash("md5").update(name).digest("hex");
  const bgColor = `#${hash.slice(0, 6)}`;
  const textColor = `#${hash.slice(6, 12)}`;

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 200, 200);

  // Draw initials
  ctx.fillStyle = textColor;
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, 100, 100);

  // Save the image to a file
  const imagePath = path.join("uploads", `${Date.now()}-${name}.png`);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(imagePath, buffer);

  return imagePath; // Return the file path
};

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Generate profile image if not already present
    if (!user.image) {
      user.image = generateProfileImage(user.name);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: `${process.env.API_URL}${path.basename(user.image)}`,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

//login function google

export const handleGoogle = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    // Step 1: Exchange the authorization code for tokens
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.status(500).json({ error: "Failed to retrieve access token" });
    }

    // Step 2: Fetch user information from Google
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfo = userResponse.data;

    // Define the fixed admin ID
    const allowedIDadmin = "67824394c37fb65437da2bd6";

    // Check if the user already exists in the database
    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      // If the user doesn't exist, create a new user
      // Define allowed roles and statuses
      const allowedRoles = ["user", "admin", "subadmin"];
      const defaultRole = allowedRoles.includes("user") ? "user" : "user"; // Default role is "user"
      const requestedStatus = "approved"; // Set the status as approved (can be dynamic if needed)

      // Proceed with the signup logic
      const newUser = new User({
        name: userInfo.name,
        email: userInfo.email,
        googleId: userInfo.sub,
        image: userInfo.picture,
        role: userInfo.sub === allowedIDadmin ? "admin" : "user", // Check if the user is admin
        status: requestedStatus,
        isVerified: true, // Google users are verified
        adminId: userInfo.sub === allowedIDadmin ? null : allowedIDadmin, // Admin doesn't need a parent ID
      });

      // Save the new user to the database
      await newUser.save();

      // If the user is admin, create an admin record and associate it
      if (newUser.role === "admin") {
        const newAdmin = new Admin({
          name: userInfo.name,
          email: userInfo.email,
          users: [],
          subAdmins: [],
        });

        await newAdmin.save();
        newUser.adminId = newAdmin._id; // Link user to their admin record
        await newUser.save();
      } else {
        // Associate the user with the admin, for role 'user' or 'subadmin'
        const admin = await Admin.findById(allowedIDadmin);
        if (!admin) {
          return res.status(404).json({
            success: false,
            message: "Admin not found. Check the predefined admin ID.",
          });
        }

        if (newUser.role === "user") {
          admin.users.push(newUser._id);
        } else if (newUser.role === "subadmin") {
          admin.subAdmins.push(newUser._id);
        }
        await admin.save();
      }

      // Redirect to the profile page with the user's ID
      return res.redirect(`${process.env.CLIENT_URL}?id=${newUser._id}`);
    } else {
      // If the user exists, update the profile picture and Google ID
      user.image = userInfo.picture;
      user.googleId = userInfo.sub;
      await user.save();

      if (user.role === "user") {
        return res.redirect(
          `${process.env.CLIENT_URL}/profile/${user._id}/topcard`
        );
      } else if (user.role === "subadmin") {
        return res.redirect(
          `${process.env.CLIENT_URL}/company/${user._id}/dashboard`
        );
      }

      // Redirect to the profile page with the user's ID
      // return res.redirect(`${process.env.CLIENT_URL}/profile/${user._id}`);
    }
  } catch (error) {
    console.error(
      "Error fetching user information:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to fetch user information" });
  }
};

export const showGoogleAuth = async (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email&access_type=offline`;

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI) {
    return res
      .status(500)
      .json({ error: "Missing required environment variables." });
  }

  return res.redirect(googleAuthUrl);
};

// getprofile function
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Adjust the query as needed
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Check if email is verified
//     if (!user.isVerified) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email not verified" });
//     }

//     // Generate JWT token
//     const token = generateJWTToken(res, user._id, user.role);

//     // Send response including the user object
//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         image: user.image, // Include the image path in the response
//       },
//       token, // Optional: return the JWT if needed on the frontend
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error. Please try again." });
//   }
// };

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log("error verifying email", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully!",
    });
  } catch (error) {
    console.log("error sending password reset email", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    console.log(password);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("error resetting password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.log("error checking auth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
  const { role } = req.query; // Get role from query parameters
  try {
    const query = role ? { role } : {}; // If role exists, filter by it
    const users = await User.find(query).select("-password"); // Exclude password
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
// Edit user details
export const editUser = async (req, res) => {
  const { userId } = req.params; // Get the userId from URL parameters
  const { name, email, status, role } = req.body; // Get data from request body

  try {
    // Validate incoming data (you can add more checks here if needed)
    if (!name || !email || !role || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, role, status) are required",
      });
    }

    // Find the user by ID and update their data
    const user = await User.findByIdAndUpdate(
      userId, // Use the userId from params
      { name, email, status, role }, // Fields to update
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send response with the updated user data
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: { ...user._doc, password: undefined }, // Exclude password
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
// Delete user
export const deleteUser = async (req, res) => {
  const { userId } = req.params; // Get the userId from URL parameters

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send response confirming deletion
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
// controllers/auth-controllers.js
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // URL to access the image

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl, // Return the image URL
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
// controllers/auth-controllers.js
export const companyUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Include the imageUrl in the response
    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        imageUrl: user.imageUrl || null, // Ensure imageUrl is included
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
