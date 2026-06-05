"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_js_1 = require("../model/category.js");
// Create a new category
const createCategory = async (req, res) => {
    try {
        const { categoryname, status } = req.body;
        // Validate input
        if (!categoryname) {
            return res.status(400).json({ message: "Category name is required." });
        }
        const newCategory = new category_js_1.Category({ categoryname, status });
        await newCategory.save();
        res
            .status(201)
            .json({ message: "Category created successfully.", data: newCategory });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create category.", error: error.message });
    }
};
exports.createCategory = createCategory;
// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await category_js_1.Category.find();
        res.status(200).json({ data: categories });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch categories.", error: error.message });
    }
};
exports.getAllCategories = getAllCategories;
// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await category_js_1.Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.status(200).json({ data: category });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch category.", error: error.message });
    }
};
exports.getCategoryById = getCategoryById;
// Update a category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryname, status } = req.body;
        const updatedCategory = await category_js_1.Category.findByIdAndUpdate(id, { categoryname, status }, { new: true, runValidators: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.status(200).json({
            message: "Category updated successfully.",
            data: updatedCategory,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to update category.", error: error.message });
    }
};
exports.updateCategory = updateCategory;
// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await category_js_1.Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.status(200).json({ message: "Category deleted successfully." });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to delete category.", error: error.message });
    }
};
exports.deleteCategory = deleteCategory;
