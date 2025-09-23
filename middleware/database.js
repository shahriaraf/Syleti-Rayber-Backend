// middleware/database.js

const clientPromise = require('../db/connection');

const database = async (req, res, next) => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Get default DB from connection string
    req.db = db; // Attach the db object to the request
    next();
  } catch (e) {
    console.error("Database connection middleware error:", e);
    res.status(500).json({ msg: "Database connection error" });
  }
};

module.exports = database;