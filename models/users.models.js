import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    bio: {
      type: String,
    },
    recipeCount: {
      type: Number,
      default: 0,
      min: [0, "Recipe count cannot be negative"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    otp: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "User type must be either 'user' or 'admin'",
      },
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
