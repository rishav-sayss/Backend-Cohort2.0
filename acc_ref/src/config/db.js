const { default: mongoose } = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://RishabhShrivas:JGvSeoS3d7dFmDn8@cluster0.n1okebc.mongodb.net/test-accreff");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in connecting db", error);
  }
};

module.exports = connectDB;