import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    nameLocation: {
      type: String,
      required: true,
    },
    status: { type: String, required: true, default: "Active" },
  },
  { timestamps: true }
);

export const Location = mongoose.model("Location", locationSchema);
