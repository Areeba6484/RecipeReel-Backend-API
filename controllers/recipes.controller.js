import Recipes from "../models/recipes.model.js";

 const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find()
      .populate("userId", "name email role") // Populate user info
      .populate("reviewsId", "recipe user comment rating");

    res.status(200).json({
      message: "Recipes fetched successfully",
      data: recipes,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recipes",
      data: null,
      error: error.message
    });
  }
};

 const getRecipesbyId = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id)
      .populate("userId", "name email role")
      .populate({
        path: "reviewsId",

      });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
        data: null,
        error: true
      });
    }

    res.status(200).json({
      message: "Recipe fetched successfully",
      data: recipe,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recipe",
      data: null,
      error: error.message
    });
  }
};
// Create a new recipe

let createRecipes = async (req, res) => {
  try {
    const { title, description, time, rating, category, ingredients, instructions } = req.body;

    if (!title || !description || !time || rating === undefined || !category || !ingredients || !instructions) {
      return res.status(400).json({
        message: "All required fields must be provided",
        data: null,
        error: true
      });
    }
let user=req.user;
    const recipe = new Recipes({
      title,
      description,
      time,
      rating,
      category,
      user,
      ingredients,
      instructions,
      userId: user.id
    });

    const savedRecipe = await recipe.save();
    res.status(201).json({
      message: "Recipe created successfully",
      data: savedRecipe,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating recipe",
      data: null,
      error: error.message
    });
  }
};

// Update recipe
let updateRecipes = async (req, res) => {
  try {
    const id = req.params.id;
    let recipeData = req.body;
    let user = req.user;
    let userId = user.id;
    const { title, description, time, rating, ingredients, instructions, category } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Recipe ID is required", data: null, error: "Missing ID" });
    }

    if (!title && !description && !time && rating === undefined && !ingredients && !instructions && !category) {
      return res.status(400).json({ message: "At least one field must be provided to update", data: null, error: "No fields to update" });
    }

    const Recipe = await Recipes.findOneAndUpdate({ _id: id, userId: userId }, recipeData, { new: true });
    console.log(Recipe);

    if (!Recipe) {
      return res.status(400).json({ message: "Recipe cannot be updated or not owned by user.", data: null, error: null });
    }

    res.status(200).json({ message: "Recipe updated successfully", data: Recipe, error: null });
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
    let user = req.user;

    const recipe = await Recipes.deleteOne({ _id: id, userId: user.id });
    if (recipe.deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found or not own by user.", data: null, error: "Recipe not found or not own by user." });
    }
    if (recipe.deletedCount ===  1) {
      res.status(200).json({ message: "Recipe deleted successfully", data: recipe, error: null });
    }
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
