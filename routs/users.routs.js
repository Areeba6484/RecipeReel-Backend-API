import express from "express";
import {
  createUsers,
  getAllUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
  deleteAllUsers
} from "../controllers/users.controllers.js";

const userRouter = express.Router();

userRouter.post("/users", createUsers);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUsersById);
userRouter.put("/users/:id", updateUsers);
userRouter.delete("/users/:id", deleteUsers);
userRouter.delete("/users", deleteAllUsers);

export default userRouter;
