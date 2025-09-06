const express = require('express');
const { connectDB } = require('./db/connection');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Backend is working on Vercel 🚀');
});

// ❌ REMOVE app.listen
// ✅ Instead export the app
module.exports = app;
