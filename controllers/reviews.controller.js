import Review from "../models/reviews.models.js";



export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("recipe", "title category") // Populate recipe info
      .populate("user", "name email role"); // Populate user info

    res.status(200).json({
      message: "Reviews fetched successfully",
      data: reviews,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      data: null,
      error: error.message
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("recipe", "title category")
      .populate("user", "name email role");

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
        data: null,
        error: true
      });
    }

    res.status(200).json({
      message: "Review fetched successfully",
      data: review,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching review",
      data: null,
      error: error.message
    });
  }
};
export const createReview = async (req, res) => {
  try {
    const { recipe, user, rating, comment, reactions } = req.body;
    if (!recipe || !user || rating === undefined || !comment) {
      return res.status(400).json({
        message: "All required fields must be provided",
        data: null,
        error: true
      });
    }

    const review = new Review({
      recipe,
      user,
      rating,
      comment,
      reactions
    });

    const savedReview = await review.save();
    res.status(201).json({
      message: "Review created successfully",
      data: savedReview,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating review",
      data: null,
      error: error.message
    });
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
    const deletedReview = await Review.findByIdAndDelete(req.params.id)
      .populate("recipe")
      .populate("user");

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found", data: null, error: "Not Found" });
    }
    res.status(200).json({ message: "Review deleted", data: deletedReview, error: null });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", data: null, error: error.message });
  }
};

// Update review by ID
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
    )
      .populate("recipe")
      .populate("user");

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found", data: null, error: "Not Found" });
    }

    res.status(200).json({ message: "Review updated", data: updatedReview, error: null });
  } catch (error) {
    res.status(400).json({ message: "Validation error", data: null, error: error.message });
  }
};
