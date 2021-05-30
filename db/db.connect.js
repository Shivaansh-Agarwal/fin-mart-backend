const mongoose = require("mongoose");

async function initializeDBConnection() {
  const DB_NAME = process.env["DB_NAME"];
  const DB_USERNAME = process.env["DB_USERNAME"];
  const DB_PASSWORD = process.env["DB_PASSWORD"];
  const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.qhna2.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to MongoDB Compass Successful!");
  } catch (error) {
    console.error("Connection Failed!\n", error);
  }
}

module.exports = { initializeDBConnection };