const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

// adding new user to the db
const registerNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check whether the user is already exist in the db or not
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(409).json({
      message: "User is already present in the database. Please try login.",
    });
  }

  // console.log(name, email, password);

  try {
    const newUser = await User.create({ name, email, password });
    // console.log("newUser", newUser);
    if (!newUser) {
      return res.status(400).json({ message: "Invalid data entered." });
    }

    return res.status(201).json({
      id: newUser._id,
      name,
      email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. " + error });
  }
};

// signing in with the already registered user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checking the user is present with the entered email or not
    const user = await User.findOne({ email });

    // if user is present with the email then we need to check and match the entered password with the user's password
    if (user && (await user.matchedPassword(password))) {
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email,
        token: generateToken(user._id),
      });
    }

    // if user is not present
    return res.status(404).json({ message: "User not found." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. " + error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User is not found." });
    }

    // need to update the user's name if provided
    user.name = req.body.name || user.name;

    // if old and new password is provided
    if (req.body.oldPassword && req.body.newPassword) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );

      // Check if the old password is correct
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }

      // Hash and update the new password
      // const salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(req.body.newPassword, salt);
      user.password = req.body.newPassword;
    } else if (req.body.newPassword && !req.body.oldPassword) {
      return res.status(400).json({
        message: "Please provide the old password to change your password.",
      });
    }

    // need to save and update the data in the db
    const updatedUser = await user.save();

    //  response
    return res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. " + error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Find all users
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerNewUser, login, updateProfile, getAllUsers };
