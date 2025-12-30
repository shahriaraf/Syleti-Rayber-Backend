// controllers/userController.js
const { ObjectId } = require('mongodb'); // Import ObjectId to query by _id

// @desc    Get all user profiles
// @route   GET /api/users/profiles
exports.getAllProfiles = async (req, res) => {
    const db = req.db;
    try {
        const profiles = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        res.json(profiles);
    } catch (err) {
        console.error("Get profiles error:", err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};

// @desc    Get Single User Profile by ID
// @route   GET /api/users/profile/:id
exports.getSingleProfile = async (req, res) => {
    const db = req.db;
    try {
        // 1. Check if the provided ID is a valid MongoDB ObjectId format
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: 'Invalid User ID format' });
        }

        // 2. Query the database using ObjectId
        const profile = await db.collection('users').findOne(
            { _id: new ObjectId(req.params.id) },
            { projection: { password: 0 } } // Exclude password
        );

        // 3. Check if profile exists
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        // 4. Return the profile
        res.json(profile);

    } catch (err) {
        console.error("Get single profile error:", err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};