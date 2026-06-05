import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., "Privacy Policy", "Cancellation Policy"
    description: { type: String, required: true }, // Detailed content of the policy
   // When the policy comes into effect
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Admin/Sub-admin who created it
    isActive: { type: Boolean, default: true }, // To manage active/inactive policies
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
