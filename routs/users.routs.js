import express from "express";
import {
  signupUsers,
  getAllUsers,
  getProfile,
  loginUsers,
  updateUsers,
  changePassword,
  deleteUsers,
  deleteAllUsers
} from "../controllers/users.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const userRouter = express.Router();

// Get all users
userRouter.get("/users", verifyToken, verifyAdmin, getAllUsers);

// Get user by ID
userRouter.get("/profile", verifyToken, getProfile);

// Create a new user (Signup)
userRouter.post("/register", signupUsers);

// Login user
userRouter.post("/login", loginUsers);

// Update a user by ID
userRouter.put("/users/:id", updateUsers);
// Change password
userRouter.put("/change-password/", verifyToken, changePassword);

// Delete a user by ID
userRouter.delete("/users/:id", deleteUsers);

// Delete all users
userRouter.delete("/users", deleteAllUsers);


export default userRouter;
