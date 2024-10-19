const express = require("express");
const router = express.Router();
const { protect } = require("../config/authMiddleware");
const {
  registerValidation,
  validate,
  loginValidation,
} = require("../validation/authValidation");
const {
  registerNewUser,
  login,
  updateProfile,
} = require("../controllers/userController");

// register route
router.post("/register", registerValidation, validate, registerNewUser);

// login route
router.post("/login", loginValidation, validate, login);

// update the password route
router.put("/update-profile", protect, updateProfile);

module.exports = router;
