const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Backend is working on Vercel 🚀");
});

// Export (⚡ required by Vercel)
module.exports = app;
