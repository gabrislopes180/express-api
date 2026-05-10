import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
      error: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user.",
      error: err.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, age, role } = req.body;

    if (!name || !age || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, age, and role are required.",
      });
    }

    const newUser = new User({ name, age, role });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "failed to create User",
      error: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!userUpdated) {
      return res.status(404).json({
        success: false,
        message: "User not found to update.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      userUpdated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update user.",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete user.",
      error: err.message,
    });
  }
};
