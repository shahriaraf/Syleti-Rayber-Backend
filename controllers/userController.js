// controllers/userController.js
const { getDB } = require('../db/connection');

// @desc    Get all user profiles
// @route   GET /api/users/profiles
exports.getAllProfiles = async (req, res) => {
    const db = getDB(); // No 'await' needed anymore
    try {
        const profiles = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        res.json(profiles);
    } catch (err) {
        console.error("Get profiles error:", err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};