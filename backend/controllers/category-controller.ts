import { Category } from "../model/category.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { categoryname, status } = req.body;

    // Validate input
    if (!categoryname) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const newCategory = new Category({ categoryname, status });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category created successfully.", data: newCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create category.", error: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch categories.", error: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ data: category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch category.", error: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryname, status } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryname, status },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update category.", error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete category.", error: error.message });
  }
};
