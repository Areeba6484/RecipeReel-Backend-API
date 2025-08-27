import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReviewById,
  deleteAllReviews,
   updateReviewById
} from "../controllers/reviews.controller.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.post("/", createReview);
reviewRouter.put("/:id", updateReviewById )
reviewRouter.delete("/:id", deleteReviewById);
reviewRouter.delete("/", deleteAllReviews);


export default reviewRouter;
