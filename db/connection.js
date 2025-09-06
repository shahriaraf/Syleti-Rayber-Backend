const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI is missing in environment variables!");

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev, reuse connection between hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production (Vercel), create a new client per request
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

const getDB = async () => {
  const connectedClient = await clientPromise;
  return connectedClient.db(); // will use DB name from URI
};

module.exports = { getDB };
