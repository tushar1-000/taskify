import asynHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/genrateToken.js";

/*
desc    Login user & set token
route   POST  /api/users/login
access  Public
*/
const loginUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201);
    res.send({
      _id: user._id,
      name: user.name,
      eamil: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
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
    generateToken(res, user._id);
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
});

/*
desc    Logout  user
route   POST  /api/users/logout
access  Public
*/
const logoutUser = asynHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict",
    expires: new Date(0),
  });
  return res.status(200).json({ message: "User logout successfully" });
});

/*
desc    Get user profile
route   GET  /api/users/profile
access  Private
*/
const getUserProfile = asynHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  return res.status(200).json(user);
});

/*
desc    Update user profile
route   PUT  /api/users/profile
access  Private
*/
const updateUserProfile = asynHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
