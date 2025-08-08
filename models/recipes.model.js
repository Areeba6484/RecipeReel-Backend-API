import mongoose from "mongoose";

const { Schema } = mongoose;

const recipesSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    validate: {
      validator: (value) => typeof value === "string" && value !== "",
      message: "Title must be a non-empty string",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    validate: {
      validator: (value) => typeof value === "string" && value !== "",
      message: "Description must be a non-empty string",
    },
  },
  time: {
    type: String,
    required: [true, "Time is required"],
    validate: {
      validator: (value) => typeof value === "string" && value !== "",
      message: "Time must be a non-empty string",
    },
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    validate: {
      validator: (value) => typeof value === "number" && value >= 0 && value <= 5,
      message: "Rating must be a number between 0 and 5",
    },
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    validate: {
      validator: (value) => typeof value === "string" && value !== "",
      message: "Category must be a non-empty string",
    },
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required"],
    validate: {
      validator: (value) => Array.isArray(value) && value.length > 0,
      message: "Ingredients must be a non-empty array of strings",
    },
  },
  instructions: {
    type: [String],
    required: [true, "Instructions are required"],
    validate: {
      validator: (value) => Array.isArray(value) && value.length > 0,
      message: "Instructions must be a non-empty array of strings",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  savedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
  }],
});

const Recipes = mongoose.model("Recipe", recipesSchema);
export default Recipes;
