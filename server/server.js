require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.routes");
const contactRouter = require("./routes/contact.routes");
const serviceRouter = require("./routes/service.routes");
const adminRouter = require("./routes/admin.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const authMiddleWare = require("./middlewares/auth.middleware");
const path = require("path");

// CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const connectDB = require("./config/db");

// Routes
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);
app.use(errorMiddleware);
app.use(authMiddleWare);

// Static Files
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Server
const PORT = process.env.PORT || 3000;

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
