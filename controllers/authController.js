const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDB } = require('../db/connection');

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
    const db = getDB();
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check for existing user
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object (including all registration fields)
        const newUser = {
            ...req.body,
            password: hashedPassword,
            createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(newUser);
        res.status(201).json({ msg: 'User registered successfully', userId: result.insertedId });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
    const db = getDB();
    const { email, password } = req.body;

    try {
        // Check for user
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create JWT
        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};