const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongoDB successfully");
  } catch (error) {
    console.log("mongoose connect error", error);
  }
};

module.exports = connectDB;
