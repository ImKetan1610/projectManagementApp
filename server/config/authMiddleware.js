const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token present." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found." });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Not authorized, token failed." });
  }
};

module.exports = { protect };
