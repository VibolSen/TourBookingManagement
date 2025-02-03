import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    PackageDescription: { type: String, required: true },
    DescriptionTip: { type: String, required: false }, // Ti
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in days or hours, depending on your use case
    maxGroupSize: { type: Number, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    location: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    status: { type: String, required: true, default: "Active" },
    mainImage: { type: String, required: true }, // URL or file path
    galleryImages: { type: [String], default: [] }, // Array of URLs or file paths
    startDate: { type: Date, required: true }, // Start date for the tour
    endDate: { type: Date, required: true }, // End date for the tour
    company: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Reference to the Company model
      required: true, // Assuming every tour must belong to a company
    },
  },

  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
export { Tour };
