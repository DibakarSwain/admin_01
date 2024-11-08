const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successfull...");
  } catch (err) {
    console.log("connection failed...");
    process.exit(0);
  }
};
module.exports = connectDb;
