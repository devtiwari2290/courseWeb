const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const serviceControllers = require("../controllers/service.controller");

// Add Service Route
router.route("/add-service").post(serviceControllers.addService);

// Get Service Route
router.route("/service").get(serviceControllers.getAllService);

// Update Service Route
router.route("/update-service/:id").put(serviceControllers.updateService);

// Delete Service Route
router.route("/delete-service/:id").delete(serviceControllers.deleteService);

module.exports = router;
