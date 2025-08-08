import express from "express";
import {
  getRecipes,
  getRecipesbyId,
  deleteAllRecipes,
  deleteRecipesbyId,
  createRecipes,
  updateRecipes
} from "../controllers/recipes.controller.js";

const recipeRouter = express.Router();

recipeRouter.get("/recipes", getRecipes);
recipeRouter.get("/recipes/:id", getRecipesbyId);
recipeRouter.post("/recipes", createRecipes);
recipeRouter.put("/recipes/:id", updateRecipes);
recipeRouter.delete("/recipes", deleteAllRecipes);
recipeRouter.delete("/recipes/:id", deleteRecipesbyId);

export default recipeRouter;
