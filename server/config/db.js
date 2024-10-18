const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is connected..!");
  } catch (error) {
    console.log(error);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDb;
