const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleWare = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    // Properly remove "Bearer " from token
    token = token.replace("Bearer ", "").trim();

    // Verify JWT token
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user and get user details, excluding password
    const userData = await User.findOne({ email: isVerified.email }).select(
      "-password"
    );

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user details to request object
    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.error(`Error: ${error.message}`);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = authMiddleWare;
