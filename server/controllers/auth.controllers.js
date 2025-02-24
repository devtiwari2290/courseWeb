const User = require("../models/userModel"); // Adjust path as needed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Can be 'gmail' or 'smtp'
  host: "smtp.gmail.com",
  port: 587, // 587 for TLS, 465 for SSL
  secure: false, // Set true for port 465
  auth: {
    user: process.env.EMAIL_USER, // Ensure this is set in .env
    pass: process.env.EMAIL_PASS, // Use App Password if using Gmail
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

// Home Controller
const home = async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to the Home Page" });
  } catch (error) {
    res.status(500).send({ message: "Home Page not found" });
    console.log(error);
  }
};

// Register Controller
const register = async (req, res, next) => {
  try {
    const { username, email, password, contact } = req.body;

    // Check if the email is already taken
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      contact,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token: newUser.generateToken(),
      userId: newUser._id.toString(),
    });
    console.log("User Registered Successfully");
  } catch (error) {
    // res.status(500).send({ message: "Internal Server Error" });
    next(error);
  }
};

// Login Controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await userExist.comparePassword(password);

    if (isPasswordCorrect) {
      // Check if the user is an admin
      const message = userExist.isAdmin
        ? "Admin Logged In Successfully"
        : "User Logged In Successfully";

      res.status(201).json({
        success: true,
        message: message,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        isAdmin: userExist.isAdmin,
      });

      console.log(message);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};


// Forgot Password Controller
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Save OTP and expiration time in the database
    userExist.otp = otp;
    userExist.otpExpires = otpExpires;
    await userExist.save(); // Save the updated user document

    console.log("Generated OTP:", otp);

    // Send the OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userExist.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password Reset OTP Sent Successfully",
    });

    console.log("Password Reset OTP Sent Successfully");
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Ensure OTP and expiration date exist in the user record
    if (!userExist.otp || !userExist.otpExpires) {
      return res.status(400).json({ message: "OTP is missing or expired" });
    }

    // Convert OTP expiry to a valid Date object (Ensure proper type handling)
    const otpExpiryTime = new Date(userExist.otpExpires);

    if (isNaN(otpExpiryTime.getTime())) {
      return res
        .status(400)
        .json({ message: "OTP expiration date is invalid" });
    }

    // Check if OTP is expired
    if (otpExpiryTime < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Convert OTP to string and compare
    if (userExist.otp.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear OTP fields
    userExist.password = hashedPassword;
    userExist.otp = null;
    userExist.otpExpires = null;

    await userExist.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });

    console.log("Password Reset Successfully");
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User Controller (To get user details)
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data", userData);

    return res.status(200).json({ msg: "User Data", userData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get User Profile Controller (To get user details)
const getUserProfile = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the user by ID
    const singleUser = await User.findOne({ _id: id }, { password: 0 });

    return res.status(200).json({ message: "SingleUser Details", singleUser });
  } catch (error) {
    next(error);
  }
};

// User Profile Update Controller (To update user details)
const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Exclude password from the request body
    const { password, ...updateData } = req.body;

    // Find the user by ID and update it without modifying the password
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Ensures validation is applied
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User Profile Updated Successfully", updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  home,
  register,
  login,
  forgetPassword,
  resetPassword,
  user,
  getUserProfile,
  updateUserProfile,
};
