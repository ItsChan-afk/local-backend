const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if (conn) {
      console.log("Connection Successfully!");
    }
  } catch (error) {
    console.log("Error Occured while connecting to Database ", error);
    process.exit(1);
  }
};

module.exports = dbConnection;
