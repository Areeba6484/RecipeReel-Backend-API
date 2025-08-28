import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteAllCategories
} from "../controllers/category.controller.js";
import {verifyAdmin,verifyToken} from "../middlewares/auth.js";

const categoryRouter = express.Router();
//public routes

categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/categories/:id", getCategoryById);

//protected routes

categoryRouter.post("/categories", verifyToken, verifyAdmin, createCategory);
categoryRouter.put("/categories/:id", verifyToken, verifyAdmin, updateCategory);
categoryRouter.delete("/categories/:id", verifyToken, verifyAdmin, deleteCategory);

// Delete all categories
categoryRouter.delete("/categories", verifyToken, verifyAdmin, deleteAllCategories);

export default categoryRouter;
