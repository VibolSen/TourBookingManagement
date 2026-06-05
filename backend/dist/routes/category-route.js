"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_js_1 = require("../controllers/category-controller.js");
const router = express_1.default.Router();
// Create a new category
router.post("/", category_controller_js_1.createCategory);
// Get all categories
router.get("/", category_controller_js_1.getAllCategories);
// Get a category by ID
router.get("/:id", category_controller_js_1.getCategoryById);
// Update a category
router.put("/:id", category_controller_js_1.updateCategory);
// Delete a category
router.delete("/:id", category_controller_js_1.deleteCategory);
exports.default = router;
