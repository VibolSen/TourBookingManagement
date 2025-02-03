import Policy from "../../model/policy.js"; // Import the Policy model
import { User } from "../../model/user.js"; // Import the User model for createdBy validation

// Create a new policy
export const createPolicy = async (req, res) => {
  const { title, description } = req.body;
  const subAdminId = req.params.id; // Sub-admin ID from the URL parameter

  try {
    // Check if the sub-admin exists and has the correct role
    const subAdmin = await User.findById(subAdminId);
    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res.status(403).json({
        success: false,
        message: "Only subadmins can create policies.",
      });
    }

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: title, description, and effectiveDate.",
      });
    }

    // Create the policy
    const policy = new Policy({
      title,
      description,
      createdBy: subAdminId,
    });

    await policy.save();

    res.status(201).json({
      success: true,
      message: "Policy created successfully.",
      policy,
    });
  } catch (error) {
    console.error("Error creating policy:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating policy.",
      error: error.message,
    });
  }
};

// Get all policies (with optional filter by isActive)
export const getPolicies = async (req, res) => {
  const subAdminId = req.params.id; // Sub-admin ID from the URL parameter
  const { isActive } = req.query; // Optional filter for active/inactive policies

  try {
    // Check if the sub-admin exists
    const subAdmin = await User.findById(subAdminId);
    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res.status(403).json({
        success: false,
        message: "Only subadmins can view policies.",
      });
    }

    // Build the query
    const query = { createdBy: subAdminId };
    if (isActive !== undefined) {
      query.isActive = isActive === "true"; // Convert string to boolean
    }

    // Fetch policies
    const policies = await Policy.find(query);

    res.status(200).json({
      success: true,
      message: "Policies fetched successfully.",
      policies,
    });
  } catch (error) {
    console.error("Error fetching policies:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching policies.",
      error: error.message,
    });
  }
};

// Get a single policy by ID
export const getPolicyById = async (req, res) => {
  const { subadminId, id } = req.params; // Sub-admin ID and policy ID from the URL

  try {
    // Check if the sub-admin exists
    const subAdmin = await User.findById(subadminId);
    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res.status(403).json({
        success: false,
        message: "Only subadmins can view this policy.",
      });
    }

    // Fetch the policy
    const policy = await Policy.findOne({ _id: id, createdBy: subadminId });
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Policy fetched successfully.",
      policy,
    });
  } catch (error) {
    console.error("Error fetching policy:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching policy.",
      error: error.message,
    });
  }
};

// Update a policy by ID
export const updatePolicy = async (req, res) => {
  const { subadminId, id } = req.params; // Sub-admin ID and policy ID from the URL
  const { title, description, isActive } = req.body;

  try {
    // Check if the sub-admin exists
    const subAdmin = await User.findById(subadminId);
    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res.status(403).json({
        success: false,
        message: "Only subadmins can update policies.",
      });
    }

    // Find the policy
    const policy = await Policy.findOne({ _id: id, createdBy: subadminId });
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    // Update the policy fields
    if (title) policy.title = title;
    if (description) policy.description = description;
    if (isActive !== undefined) policy.isActive = isActive;

    await policy.save();

    res.status(200).json({
      success: true,
      message: "Policy updated successfully.",
      policy,
    });
  } catch (error) {
    console.error("Error updating policy:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating policy.",
      error: error.message,
    });
  }
};

// Delete (soft delete) a policy by ID
// Delete a policy by ID
export const deletePolicy = async (req, res) => {
  const { subadminId, id } = req.params; // Sub-admin ID and policy ID from the URL

  try {
    // Check if the sub-admin exists
    const subAdmin = await User.findById(subadminId);
    if (!subAdmin || subAdmin.role !== "subadmin") {
      return res.status(403).json({
        success: false,
        message: "Only subadmins can delete policies.",
      });
    }

    // Find and delete the policy
    const policy = await Policy.findOneAndDelete({ _id: id, createdBy: subadminId });
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Policy deleted successfully.",
      policy,
    });
  } catch (error) {
    console.error("Error deleting policy:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while deleting policy.",
      error: error.message,
    });
  }
};

