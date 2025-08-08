import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteAllCategories
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

// Create a new category (custom validation is inside controller)
categoryRouter.post("/categories", createCategory);

// Get all categories
categoryRouter.get("/categories", getAllCategories);

//  Get a single category by ID
categoryRouter.get("/categories/:id", getCategoryById);

//  Update a category by ID
categoryRouter.put("/categories/:id", updateCategory);

// Delete a category by ID
categoryRouter.delete("/categories/:id", deleteCategory);

// Delete all categories
categoryRouter.delete("/categories", deleteAllCategories);

export default categoryRouter;
