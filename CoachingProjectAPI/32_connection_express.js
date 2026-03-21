import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const url = process.env.db_url;

console.log("DB URL:", url); // ✅ yeh add kar

mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });