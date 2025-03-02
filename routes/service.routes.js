const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const serviceControllers = require("../controllers/service.controller");

// Get Service Route
router.route("/service").get(serviceControllers.getAllService);

module.exports = router;
