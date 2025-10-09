// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./middleware/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const whitelist = ['https://www.merrigemedia.com', 'https://merrigemedia.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  credentials: true,
};



app.use(cors(corsOptions)); 
app.use(express.json());
app.use(database);


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Syleti Rayber API is running successfully on Vercel!');
});


module.exports = app;