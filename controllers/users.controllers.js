import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
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
// ✅ Get logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // comes from token (auth middleware)

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      data: null,
      error: error.message,
    });
  }
};


// SIGNUP
export const signupUsers = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Missing required fields",
      data: null,
      error: "name, email, and password are required",
    });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        message: "Validation errors",
        data: null,
        error: "User with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpired = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      otp: otp,
      otpExpired: otpExpired,
      active: false
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        address: user.address,
        profilePicture: user.profilePicture,
        bio: user.bio,
        recipeCount: user.recipeCount,
        userType: user.userType,
        isVerified: user.isVerified,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      data: null,
      error: error.message,
    });
  }
};

// LOGIN
export const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        data: null,
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        error: "Invalid email",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Authentication failed",
        data: null,
        error: "Invalid email or password",
      });
    }
    if (user.status ===  "inactive"){
      return res.status(403).json({
        message: "Account is inactive",
        data: null,
        error: "Please contact support.",
      });
    }

    let token = jwt.sign({ id: user._id,
      role: user.role
     }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        token: token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          address: user.address,
          profilePicture: user.profilePicture,
          bio: user.bio,
          recipeCount: user.recipeCount,
          userType: user.userType,
          isVerified: user.isVerified,
        },

      },
      error: null,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to login",
      data: null,
      error: error.message,
    });
  }
};


export const changePassword = async (req, res) => {
let userId = req.user.id;

  const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Missing required fields",
        data: null,
        error: "oldPassword, newPassword, and confirmPassword are required",
      });
    }
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from old password",
        data: null,
        error: "New password and old password must not match",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        data: null,
        error: "New password and confirm password must match",
      });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          data: null,
          error: "Invalid user ID",
        });
      }

      // ✅ Compare oldPassword with stored hashed password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Change password failed",
          data: null,
          error: "Invalid old password",
        });
      }

      // ✅ Hash new password before saving
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;

      await user.save();

      return res.status(200).json({
        message: "Password changed successfully",
        data: null,
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change password",
        data: null,
        error: error.message,
      });
    }
  };
// Update user by ID
export const updateUsers = async (req, res) => {
  try {
    // Check if restricted fields are being updated
    if (req.body.email || req.body.role) {
      return res.status(400).json({
        message: "You cannot update email or role",
        data: null,
        error: "Restricted fields: email, role",
      });
    }

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
