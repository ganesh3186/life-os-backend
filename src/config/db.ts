import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI as string);

  isConnected = db.connections[0].readyState === 1;
  console.log("MongoDB Connected");
};
