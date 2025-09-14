import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Minimum rating is 1"],
    max: [5, "Maximum rating is 5"]
  },
  comment: {
    type: String,
    required: [true, "Comment is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reactions: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
