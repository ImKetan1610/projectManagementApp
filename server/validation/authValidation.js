const { body, validationResult } = require("express-validator");

// add Validation rule for registration
const registerValidation = [
  body("name")
    .isLength({ min: 8 })
    .withMessage("Name must be at least 8 Characters long"),
  body("email").isEmail().withMessage("Please add valid email id"),
  body("password")
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password should be at least 8 character long having at least 1special char, number, lower and uppercase letter."
    ),
];

// Validation rules for login
const loginValidation = [
  body("email").isEmail().withMessage("Please add a valid email ID"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

// middleware to validate the registration data
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { registerValidation, loginValidation, validate };