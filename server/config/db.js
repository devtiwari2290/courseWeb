const mongoose = require("mongoose");
// MONGO_URI = mongodb+srv://devrajtiwari229:devtiwari123@cluster0.y9i830m.mongodb.net/MERN_PROJECT?retryWrites=true&w=majority
// Get MongoDB URI from environment variables
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
