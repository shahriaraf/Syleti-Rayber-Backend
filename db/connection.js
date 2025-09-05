const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db(); // If your DB name is in the URI, this is enough. Otherwise, client.db("marriage_media")
        console.log("MongoDB Connected successfully!");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const getDB = () => {
    if (db) {
        return db;
    }
    throw new Error("No database found!");
};

module.exports = { connectDB, getDB };