const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.LINK_DB);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
