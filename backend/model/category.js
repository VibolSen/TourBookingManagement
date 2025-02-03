import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryname: {
      type: String,
      required: true,
    },
    status: { type: String, required: true, default: "Active" },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
