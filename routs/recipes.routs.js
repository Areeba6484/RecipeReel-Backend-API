import express from "express";
import {
  getRecipes,
  getRecipesbyId,
  deleteAllRecipes,
  deleteRecipesbyId,
  createRecipes,
  updateRecipes
} from "../controllers/recipes.controller.js";
import {verifyAdmin,verifyToken} from "../middlewares/auth.js";

const recipeRouter = express.Router();

recipeRouter.get("/recipes", getRecipes);
recipeRouter.get("/recipes/:id", getRecipesbyId);
recipeRouter.post("/recipes", verifyToken, createRecipes);
recipeRouter.put("/recipes/:id", verifyToken,updateRecipes);
recipeRouter.delete("/recipes/:id", verifyToken, deleteRecipesbyId);
recipeRouter.delete("/recipes",  deleteAllRecipes);


export default recipeRouter;
