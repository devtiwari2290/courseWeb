const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
      unique: true,
    },

    otp: {
      type: String,
      default: 0,
    },

    otpExpires: {
      type: Date,
      default: Date.now(),
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compare password
userSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Generate JWT token
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id,
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// User model
const User = mongoose.model("User", userSchema);

module.exports = User;
