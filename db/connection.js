// db/connection.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("❌ MONGO_URI is missing from your .env file!");
}

const client = new MongoClient(uri);
let db;

const connectDB = async () => {
  if (db) {
    return; // Already connected
  }
  try {
    await client.connect();
    db = client.db(); // Use the default database from your MONGO_URI
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with an error
  }
};

// This function is now synchronous because we ensure the connection is established at startup.
const getDB = () => {
  if (!db) {
    throw new Error("Database not connected. Make sure connectDB() is called at server start.");
  }
  return db;
};

module.exports = { connectDB, getDB };