// controllers/userController.js

// @desc    Get all user profiles
// @route   GET /api/users/profiles
exports.getAllProfiles = async (req, res) => {
    const db = req.db; // Get the db instance from the request object
    try {
        // Find all users but exclude the password field for security
        const profiles = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        res.json(profiles);
    } catch (err) {
        console.error("Get profiles error:", err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};