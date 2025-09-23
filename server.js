// server.js (MODIFIED FOR VERCEL)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database immediately
connectDB();

// Setup Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Welcome Route for testing
app.get('/', (req, res) => {
  res.send('Syleti Rayber API is running successfully on Vercel...');
});

// Export the app for Vercel to use
module.exports = app;