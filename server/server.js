// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const authRouter = require("./routes/auth.routes");
// const contactRouter = require("./routes/contact.routes");
// const serviceRouter = require("./routes/service.routes");
// const adminRouter = require("./routes/admin.routes");
// const errorMiddleware = require("./middlewares/error.middleware");
// const authMiddleWare = require("./middlewares/auth.middleware");
// const path = require("path");

// // CORS
// const corsOptions = {
//   origin: process.env.VERCEL_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database
// const connectDB = require("./config/db");

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/form", contactRouter);
// app.use("/api/data", serviceRouter);
// app.use("/api/admin", adminRouter);
// app.use(errorMiddleware);
// app.use(authMiddleWare);

// // Static Files
// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

// // Server
// const Port = process.env.PORT || 3000;

// // Start Server
// connectDB().then(() => {
//   app.listen(Port, () => {
//     console.log(`Server is running on port ${Port}`);
//   });
// });

require("dotenv").config(); // Load environment variables at the top

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/auth.routes");
const contactRouter = require("./routes/contact.routes");
const serviceRouter = require("./routes/service.routes");
const adminRouter = require("./routes/admin.routes");

const errorMiddleware = require("./middlewares/error.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const connectDB = require("./config/db");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.VERCEL_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);

// Apply middleware (Ensure error middleware is last)
app.use(authMiddleware);
app.use(errorMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Define Port
const PORT = process.env.PORT || 3000;

// Start Server after connecting to DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
