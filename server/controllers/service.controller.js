const Service = require("../models/service.model");

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

module.exports = {
  getAllService,
};
