const Service = require("../models/service.model");

// Add Service controller
const addService = async (req, res) => {
  try {
    const { name, description, price, duration, category } = req.body;
    // const photo = req.file ? req.file.path : null;

    // Check if service already exists
    const existingService = await Service.findOne({ name });
    if (existingService) {
      return res.status(400).json({ message: "Service already exists" });
    }

    // Check if any field is empty
    if (!name || !description || !price || !duration || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if price is a number
    if (isNaN(price)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    // Create new service object
    const newService = new Service({
      name,
      description,
      price,
      duration,
      category,
    });

    // Save to database
    await newService.save();

    res
      .status(201)
      .json({ message: "Service added successfully", service: newService });
  } catch (error) {
    console.error("Error adding service:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Service controller
const getAllService = async (req, res) => {
  try {
    const services = await Service.find({});

    //  Check if services exist
    if (!services) {
      return res.status(404).json({ message: "No services found" });
    }

    res.status(200).json({ message: "Services", services });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

// Update Service controller
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, category } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        duration,
        category,
      },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

// Delete Service controller
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = {
  addService,
  getAllService,
  updateService,
  deleteService,
};
