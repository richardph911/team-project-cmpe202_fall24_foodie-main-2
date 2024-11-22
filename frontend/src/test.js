import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db("Foodie");
    const collection = db.collection("Users");

    // Fetch all documents from the Users collection
    const users = await collection.find({}).toArray();

    // Print the Users table
    console.log("Users Table:");
    console.table(
      users.map((user) => ({
        ID: user._id,
        Name: user.name || "N/A",
        Street: user.street || "N/A",
        City: user.city || "N/A",
        CreatedAt: user.createdAt || "N/A",
      }))
    );

    await client.close();
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}

connectDB();
