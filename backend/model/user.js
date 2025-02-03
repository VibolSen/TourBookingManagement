import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store the URL of the image
      default: null, // Optional default value
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      unique: true, // Ensure Google ID is unique
      sparse: true, // Allow multiple null values
    },
    password: {
      type: String,
      default: null, // Optional for Google users
    },
    isVerified: {
      type: Boolean,
      default: true, // Google users are automatically verified
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved", // Default status for Google users
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "subadmin", "user"],
      default: "user", // Default role
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null, // For users without admin references
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

