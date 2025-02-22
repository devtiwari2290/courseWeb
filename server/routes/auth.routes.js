const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");
const { signupSchema, loginSchema } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");
const authMiddleWare = require("../middlewares/auth.middleware");

// Home Route
router.route("/").get(authControllers.home);

// Register Route
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);

// Login Route
router.route("/login").post(validate(loginSchema), authControllers.login);

// Forget Password Route
router.route("/forgot-password").post(authControllers.forgetPassword);

// Reset Password Route
router.route("/reset-password").post(authControllers.resetPassword);

// User Route
router.route("/user").get(authMiddleWare, authControllers.user);

// Get User Profile Data Route
router
  .route("/user/profile/:id")
  .get(authMiddleWare, authControllers.getUserProfile);

// User  Update Profile Route
router
  .route("/user/profile/update/:id")
  .put(authMiddleWare, authControllers.updateUserProfile);

module.exports = router;
