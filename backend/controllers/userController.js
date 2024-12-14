import asynHandler from "express-async-handler";
import User from "../models/userModel.js";

/*
desc    Login user & set token
route   POST  /api/users/login
access  Public
*/
const loginUser = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "Login user" });
});

/*
desc    Register  user
route   POST  /api/users/
access  Public
*/
const registerUser = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201);
    res.send({
      _id: user._id,
      name: user.name,
      eamil: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  return res.status(200).json({ message: "Register user" });
});

/*
desc    Logout  user
route   POST  /api/users/logout
access  Public
*/
const logoutUser = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "Logout user" });
});

/*
desc    Get user profile
route   GET  /api/users/profile
access  Private
*/
const getUserProfile = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "User profile" });
});

/*
desc    Update user profile
route   PUT  /api/users/profile
access  Private
*/
const updateUserProfile = asynHandler(async (req, res) => {
  return res.status(200).json({ message: "Update user profile" });
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
