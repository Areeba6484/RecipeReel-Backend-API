import Category from "../models/category.model.js";

//  Create a new category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  // Custom validation at controller level
  if (!name || !description) {
    return res.status(400).json({
      message: "Name and description are required",
      data: null,
      error: "Validation error",
    });
  }

  try {
    // Check if name already exists
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({
        message: "Category name must be unique",
        data: null,
        error: "Duplicate category",
      });
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create category",
      data: null,
      error: error.message,
    });
  }
};

//  Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

//  Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: null,
        error: "Invalid ID",
      });
    }

    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch category",
      data: null,
      error: error.message,
    });
  }
};
//  Update category
export const updateCategory = async (req, res) => {
  const { name, description } = req.body;

  // Custom validation
  if (!name || !description) {
    return res.status(400).json({
      message: "Name and description are required",
      data: null,
      error: "Validation error",
    });
  }

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: null,
        error: "Invalid ID",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update category",
      data: null,
      error: error.message,
    });
  }
};

//  Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: null,
        error: "Invalid ID",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete category",
      data: null,
      error: error.message,
    });
  }
};

// Delete all categories
export const deleteAllCategories = async (req, res) => {
  try {
    const result = await Category.deleteMany({});
    res.status(200).json({
      message: "All categories deleted successfully",
      data: { deletedCount: result.deletedCount },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete all categories",
      data: null,
      error: error.message,
    });
  }
};

