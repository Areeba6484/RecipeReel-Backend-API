import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReviewById,
  deleteAllReviews,
   updateReviewById
} from "../controllers/reviews.controller.js";
import {verifyAdmin,verifyToken} from "../middlewares/auth.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.post("/", createReview);
//protected routes

reviewRouter.put("/:id", verifyToken, updateReviewById);
reviewRouter.delete("/:id", verifyToken, deleteReviewById);

reviewRouter.delete("/", deleteAllReviews);

export default reviewRouter;
