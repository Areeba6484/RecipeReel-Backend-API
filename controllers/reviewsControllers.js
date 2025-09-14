import Review from "../models/reviewsModels.js";

// ✅ Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("recipe", "title category")
      .populate("user", "name email role");

    res.status(200).json({
      message: "Reviews fetched successfully",
      data: reviews,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      data: null,
      error: error.message,
    });
  }
};

// ✅ Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("recipe", "title category")
      .populate("user", "name email role");

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
        data: null,
        error: "Not Found",
      });
    }

    res.status(200).json({
      message: "Review fetched successfully",
      data: review,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching review",
      data: null,
      error: error.message,
    });
  }
};

// ✅ Create a new review
export const createReview = async (req, res) => {
  try {
    const { recipe,rating, comment} = req.body;

    // Simple validation
    if (!recipe || rating === undefined || !comment) {
      return res.status(400).json({
        message: "All required fields (recipe, rating, comment) must be provided",
        data: null,
        error: "Validation Error",
      });
    }

    const review = new Review({
      recipe,
      rating,
      comment,
    });

    const savedReview = await review.save();

    res.status(201).json({
      message: "Review created successfully",
      data: savedReview,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating review",
      data: null,
      error: error.message,
    });
  }
};

// ✅ Update review by ID
export const updateReviewById = async (req, res) => {
  try {
    const updates = {};
    if (req.body.rating !== undefined) updates.rating = req.body.rating;
    if (req.body.comment) updates.comment = req.body.comment;
    if (req.body.reactions) updates.reactions = req.body.reactions;

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    )
      .populate("recipe", "title category")
      .populate("user", "name email role");

    if (!updatedReview) {
      return res.status(404).json({
        message: "Review not found",
        data: null,
        error: "Not Found",
      });
    }

    res.status(200).json({
      message: "Review updated successfully",
      data: updatedReview,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating review",
      data: null,
      error: error.message,
    });
  }
};

// ✅ Delete review by ID
export const deleteReviewById = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id)
      .populate("recipe", "title category")
      .populate("user", "name email role");

    if (!deletedReview) {
      return res.status(404).json({
        message: "Review not found",
        data: null,
        error: "Not Found",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
      data: deletedReview,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting review",
      data: null,
      error: error.message,
    });
  }
};

// ✅ Delete all reviews
export const deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany();
    res.status(200).json({
      message: "All reviews deleted successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting reviews",
      data: null,
      error: error.message,
    });
  }
};
