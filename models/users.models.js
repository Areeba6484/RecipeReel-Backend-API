import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "User name is required"],
    },
    userType: {
      type: String,
      enum: {
        values: ["user", "admin", "chef"],
        message: "UserType must be either 'user' or 'admin' , 'chef'",
      },
      default: "user",
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
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
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
    profilePicture: {
      type: String,
      default: "default.jpg",
    },
    address: {
      type: String
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Status must be either 'active' or 'inactive'",
      },
      default: "active",
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be either 'user' or 'admin'",
      },
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
