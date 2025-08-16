import express from "express";
import {
  signupUsers,
  getAllUsers,
  loginUsers,
  updateUsers,
  changePassword,
  deleteUsers,
  deleteAllUsers
} from "../controllers/users.controllers.js";
import verifyToken from "../middlewares/auth.js";

const userRouter = express.Router();

// Create a new user (Signup)
userRouter.post("/register", signupUsers);

// Login user
userRouter.post("/login", loginUsers);

// Get all users
userRouter.get("/users", getAllUsers);

// Update a user by ID
userRouter.put("/users/:id", updateUsers);
userRouter.put("/change-password/", verifyToken, changePassword);

// Delete a user by ID
userRouter.delete("/users/:id", deleteUsers);

// Delete all users
userRouter.delete("/users", deleteAllUsers);


export default userRouter;
