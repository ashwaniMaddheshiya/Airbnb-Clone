const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_URI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(DB_URI);
  } catch (err) {
    console.log({ message: err.message });
  }
};

module.exports = connectToMongo;
