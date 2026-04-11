import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const url = process.env.db_url;

console.log("DB URL:", url);

if (!url) {
  console.error("❌ db_url is missing in .env file");
  process.exit(1);
}

mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });