const { getDB } = require('../db/connection');

// @desc    Get all user profiles
// @route   GET /api/users/profiles
exports.getAllProfiles = async (req, res) => {
    const db = getDB();
    try {
        // Find all users but exclude the password field for security
        const profiles = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};