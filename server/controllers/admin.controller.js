const Contact = require("../models/contact.model");
const User = require("../models/userModel");
const Service = require("../models/service.model");

// Admin All Users Controller
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    // Check if users exist
    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ message: "Users", users });
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

// Get Single User Controller
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Find the user by ID
    const singleUser = await User.findOne({ _id: id }, { password: 0 });

    return res.status(200).json({ message: "SingleUser", singleUser });
  } catch (error) {
    next(error);
  }
};

// Update User Controller
const updateUserById = async (req, res, next) => {
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
      .json({ message: "User Updated Successfully", updatedUser });
  } catch (error) {
    next(error);
  }
};

// Delete User Controller
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the user by ID and delete it
    const deleteUser = await User.findByIdAndDelete(id);

    // Check if user exists
    if (!deleteUser) {
      res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

// Admin Contact Controller
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});

    // Check if contacts exist
    if (!contacts || contacts.length === 0) {
      res.status(404).json({ message: "No contacts found" });
    }
    return res.status(200).json({ message: "Contacts", contacts });
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

// Delete Contact Controller
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the contact by ID and delete it
    const deleteContact = await Contact.findByIdAndDelete(id);

    // Check if contact exists
    if (!deleteContact) {
      res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// Admin Services Controller
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({});

    // Check if services exist
    if (!services || services.length === 0) {
      res.status(404).json({ message: "No services found" });
    }

    return res.status(200).json({ message: "Services", services });
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteContactById,
  getAllServices,
  getUserById,
  updateUserById,
  deleteUserById,
};
