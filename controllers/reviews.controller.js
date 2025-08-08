import Review from "../models/reviews.models.js";


// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ message: "All reviews fetched", data: reviews, error: null });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", data: null, error: error.message });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found", data: null, error: "Not Found" });
    }
    res.status(200).json({ message: "Review found", data: review, error: null });
  } catch (error) {
    res.status(500).json({ message: "Error finding review", data: null, error: error.message });
  }
};

// Create a review
export const createReview = async (req, res) => {
  const { recipeId, userId, rating, comment, reactions } = req.body;

  if (!recipeId || !userId || !rating || !comment) {
    return res.status(400).json({
      message: "Validation error",
      data: null,
      error: "recipeId, userId, rating, and comment are required"
    });
  }

  try {
    const newReview = new Review({ recipeId, userId, rating, comment, reactions });
    await newReview.save();
    res.status(201).json({ message: "Review created", data: newReview, error: null });
  } catch (error) {
    res.status(500).json({ message: "Error creating review", data: null, error: error.message });
  }
};

// Delete all reviews
export const deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany();
    res.status(200).json({ message: "All reviews deleted", data: null, error: null });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reviews", data: null, error: error.message });
  }
};

// Delete review by ID
export const deleteReviewById = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found", data: null, error: "Not Found" });
    }
    res.status(200).json({ message: "Review deleted", data: deletedReview, error: null });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", data: null, error: error.message });
  }
};

export const updateReviewById = async (req, res) => {
  const { id } = req.params;
  const updates = {};

  // Only add fields if they are present
  if (req.body.rating !== undefined) updates.rating = req.body.rating;
  
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found", data: null, error: "Not Found" });
    }

    res.status(200).json({ message: "Review updated", data: updatedReview, error: null });
  } catch (error) {
    res.status(400).json({ message: "Validation error", data: null, error: error.message });
  }
};

