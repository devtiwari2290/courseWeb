const { z } = require("zod");

// Creating an objectSchema to validate the request body

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters " })
    .max(20, { message: "Name must be at most of 20 characters " }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(13, { message: "Email must be at least of 13 characters " })
    .max(50, { message: "Email must be at most of 50 characters " })
    .email({ message: "Please fill a valid email address" })
    .toLowerCase(),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be at least of 8 characters " })
    .max(50, { message: "Password must be at most of 50 characters " })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase, uppercase, number, or special character",
      }
    ),

  contact: z
    .string({ required_error: "Contact is required" })
    .min(10, { message: "Contact must be at least of 10 characters " }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(13, { message: "Email must be at least of 13 characters " })
    .max(50, { message: "Email must be at most of 50 characters " })
    .email({ message: "Please fill a valid email address" })
    .toLowerCase(),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be at least of 8 characters " })
    .max(50, { message: "Password must be at most of 50 characters " })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase, uppercase, number, or special character",
      }
    )
    .optional(),
});

module.exports = { signupSchema, loginSchema };
