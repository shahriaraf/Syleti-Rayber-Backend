// routes/userRoutes.js
const express = require('express');
const router = express.Router();
// Import the new controller function here
const { getAllProfiles, getSingleProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get ALL profiles
router.get('/profiles', authMiddleware, getAllProfiles);

// Route to get SINGLE profile by ID
// The ':id' is a dynamic parameter that matches req.params.id in the controller
router.get('/profile/:id', authMiddleware, getSingleProfile);

module.exports = router;