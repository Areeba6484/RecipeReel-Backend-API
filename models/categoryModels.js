import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: "Category name cannot be empty",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: "Description cannot be empty",
    },
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
