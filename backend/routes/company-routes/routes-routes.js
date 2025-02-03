import express from "express";

import {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} from "../../controllers/company-controllers/policy-controllers.js";

const router = express.Router();

// Route to create a new policy (accessible by admin/sub-admins)
router.post("/:id", createPolicy);

// Route to get all policies (with optional filter by isActive)
router.get("/:id", getPolicies);

// Route to get a single policy by ID
router.get("/:subadminId/:id", getPolicyById);

// Route to update a policy by ID
router.put("/:subadminId/:id", updatePolicy);

// Route to delete (soft delete) a policy by ID
router.delete("/:subadminId/:id", deletePolicy);

export default router;
