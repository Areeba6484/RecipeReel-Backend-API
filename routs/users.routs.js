import express from "express";
import {
  signupUsers,
  getAllUsers,
  getProfile,
  loginUsers,
  updateUsers,
  changePassword,
  deleteUsers,
  deleteAllUsers,
  verifyOTP
} from "../controllers/users.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const userRouter = express.Router();

//protected routes
userRouter.get("/users", verifyToken, verifyAdmin, getAllUsers);
userRouter.get("/profile", verifyToken, getProfile);

//public routes
userRouter.post("/register", signupUsers);
userRouter.post("/login", loginUsers);
userRouter.put("/users/:id", updateUsers);
userRouter.post("/verify-otp", verifyOTP);



// Change password
userRouter.put("/change-password/", verifyToken, changePassword);
// Delete a user by ID
userRouter.delete("/users/:id", deleteUsers);
// Delete all users
userRouter.delete("/users", deleteAllUsers);


export default userRouter;
