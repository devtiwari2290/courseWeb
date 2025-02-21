const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    /*----------- Method 1 ------------- */
    // const isPasswordCorrect = await bcrypt.compare(
    //   password,
    //   userExist.password
    // );

    // if (!isPasswordCorrect) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // res.status(201).json({
    //   success: true,
    //   message: "User Logged In Successfully",
    //   token: await userExist.generateToken(),
    //   userId: userExist._id.toString(),
    // });

    // console.log("User Logged In Successfully");

    /*----------- Method 2 ------------- */
    const isPasswordCorrect = await userExist.comparePassword(password);

    if (isPasswordCorrect) {
      res.status(201).json({
        success: true,
        message: "User Logged In Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User Logged In Successfully");
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    next(error);
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

// Get User Profile Controller
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

// User Profile Update Controller
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
  user,
  getUserProfile,
  updateUserProfile,
};
