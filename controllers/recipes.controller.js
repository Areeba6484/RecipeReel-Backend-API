import Recipes from "../models/recipes.model.js";

// Create a new recipe
let createRecipes = async (req, res) => {
  try {
    const { title, description, time, rating, ingredients, instructions, category } = req.body;

    if (!title || !description || !time || rating === undefined || !ingredients || !instructions || !category) {
      return res.status(400).json({
        message: "All required fields must be provided",
        data: null,
        error: "Missing required fields",
      });
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0 || !Array.isArray(instructions) || instructions.length === 0) {
      return res.status(400).json({
        message: "Ingredients and instructions must be non-empty arrays",
        data: null,
        error: "Invalid ingredients or instructions",
      });
    }

    const newRecipe = new Recipes({ title, description, time, rating, ingredients, instructions, category });
    await newRecipe.save();

    res.status(201).json({
      message: "Recipe created successfully",
      data: newRecipe,
      error: null,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", data: null, error: error.message });
  }
};

// Get all recipes
let getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find()

    res.status(200).json({ message: "Recipes fetched successfully", data: recipes, error: null });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", data: null, error: error.message });
  }
};

// Get recipe by ID
let getRecipesbyId = async (req, res) => {
  try {
    let id = req.params.id;
    const recipe = await Recipes.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
        data: null,
        error: "Recipe not found",
      });
    }
    res.status(200).json({
      message: "Recipe fetched successfully",
      data: recipe,
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

// Update recipe
let updateRecipes = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, time, rating, ingredients, instructions, category } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Recipe ID is required", data: null, error: "Missing ID" });
    }

    if (!title && !description && !time && rating === undefined && !ingredients && !instructions && !category) {
      return res.status(400).json({ message: "At least one field must be provided to update", data: null, error: "No fields to update" });
    }

    const updatedRecipe = await Recipes.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found", data: null, error: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated successfully", data: updatedRecipe, error: null });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", data: null, error: error.message });
  }
};

// Delete recipe by ID
let deleteRecipesbyId = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Recipe ID is required", data: null, error: "Missing ID" });
    }

    const recipe = await Recipes.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found", data: null, error: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully", data: recipe, error: null });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", data: null, error: error.message });
  }
};

// Delete all recipes
let deleteAllRecipes = async (req, res) => {
  try {
    await Recipes.deleteMany({});
    res.status(200).json({ message: "All recipes deleted successfully", data: null, error: null });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", data: null, error: err.message });
  }
};

export {
  getRecipes,
  getRecipesbyId,
  deleteAllRecipes,
  deleteRecipesbyId,
  createRecipes,
  updateRecipes
};
