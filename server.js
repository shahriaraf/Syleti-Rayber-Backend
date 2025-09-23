// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./middleware/database'); // Import the new middleware
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(database); // Apply the database middleware to all requests

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root route for health check
app.get('/', (req, res) => {
  res.send('Syleti Rayber API is running successfully on Vercel!');
});

// Export the app for Vercel's serverless environment
module.exports = app;