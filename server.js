require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

connectDB();
const db = client.db(); // default DB from URI
const usersCollection = db.collection('users');

// ===== REGISTER =====
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ msg: "Required fields missing" });
        }

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { ...req.body, password: hashedPassword, dateCreated: new Date() };
        const result = await usersCollection.insertOne(newUser);

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ===== LOGIN =====
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: "Email and password required" });

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ===== PROTECTED ROUTE EXAMPLE =====
app.get('/api/users/profiles', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const users = await usersCollection.find({ _id: { $ne: new ObjectId(decoded.id) } }).toArray();
        res.status(200).json(users);
    } catch (err) {
        console.error("Profiles error:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
