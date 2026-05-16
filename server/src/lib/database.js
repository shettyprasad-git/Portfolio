import mongoose from "mongoose";

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.log("No MONGODB_URI found. Using in-memory demo storage.");
    return { useMemory: true };
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas.");
    return { useMemory: false };
  } catch (error) {
    console.warn("MongoDB connection failed. Falling back to in-memory demo storage.");
    console.warn(error.message);
    return { useMemory: true };
  }
}
