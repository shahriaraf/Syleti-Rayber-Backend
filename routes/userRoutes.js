// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProfiles } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// This route is protected
router.get('/profiles', authMiddleware, getAllProfiles);

module.exports = router;