import User from "../models/users.models.js";

// Create a new user
export const createUsers = async (req, res) => {
  const { name, email, password, role, bio } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Missing required fields",
      data: null,
      error: "Name, email, and password are required",
    });
  }

  try {
    const user = new User({ name, email, password, role, bio });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      data: null,
      error: error.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      data: null,
      error: error.message,
    });
  }
};

// Get single user by ID
export const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        error: "Invalid ID",
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get user",
      data: null,
      error: error.message,
    });
  }
};

// Update user by ID
export const updateUsers = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        error: "Invalid ID",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update user",
      data: null,
      error: error.message,
    });
  }
};

// Delete user by ID
export const deleteUsers = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        error: "Invalid ID",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete user",
      data: null,
      error: error.message,
    });
  }
};
// Delete all users
export const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({
      message: "All users deleted successfully",
      data: { deletedCount: result.deletedCount },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete all users",
      data: null,
      error: error.message,
    });
  }
};
