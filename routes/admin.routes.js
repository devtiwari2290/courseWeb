const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleWare = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

// Get All Users Route
router
  .route("/users")
  .get(authMiddleWare, adminMiddleware, adminController.getAllUsers);

// Get Single User Route
router.route("/users/:id").get(authMiddleWare, adminController.getUserById);

// Update User Route
router
  .route("/users/update/:id")
  .put(authMiddleWare, adminMiddleware, adminController.updateUserById);

// Delete User Route
router
  .route("/users/delete/:id")
  .delete(authMiddleWare, adminMiddleware, adminController.deleteUserById);

// Get ALl Contacts Route
router
  .route("/contacts")
  .get(authMiddleWare, adminMiddleware, adminController.getAllContacts);

// Delete Contact Route
router.route("/contacts/delete/:id").delete(adminController.deleteContactById);

// Get ALl Services Route
router
  .route("/services")
  .get(authMiddleWare, adminMiddleware, adminController.getAllServices);

module.exports = router;
