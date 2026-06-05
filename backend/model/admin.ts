import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
    enum: ["admin"], // Ensure only "admin" is allowed as a role
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      default: [], // Initialize as empty array
    },
  ],
  subAdmins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      default: [], // Initialize as empty array
    },
  ],
  userCount: { type: Number, default: 0 }, // Count of users
  subAdminCount: { type: Number, default: 0 }, // Count of subadmins
});

export const Admin = mongoose.model("Admin", adminSchema);
