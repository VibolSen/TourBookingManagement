"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const policy_controllers_js_1 = require("../../controllers/company-controllers/policy-controllers.js");
const router = express_1.default.Router();
// Route to create a new policy (accessible by admin/sub-admins)
router.post("/:id", policy_controllers_js_1.createPolicy);
// Route to get all policies (with optional filter by isActive)
router.get("/:id", policy_controllers_js_1.getPolicies);
// Route to get a single policy by ID
router.get("/:subadminId/:id", policy_controllers_js_1.getPolicyById);
// Route to update a policy by ID
router.put("/:subadminId/:id", policy_controllers_js_1.updatePolicy);
// Route to delete (soft delete) a policy by ID
router.delete("/:subadminId/:id", policy_controllers_js_1.deletePolicy);
exports.default = router;
