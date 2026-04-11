import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserSchemaModel from "./32_User.model_express.js";

const connectDB = async () => {
  if (!process.env.db_url) {
    throw new Error("❌ db_url is not defined in .env");
  }

  await mongoose.connect(process.env.db_url);
  console.log("✅ MongoDB Connected");
};

const createAdmin = async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await UserSchemaModel.create({
    _id: 1,
    name: "admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    mobile: "9999999999",
    city: "admincity",
    gender: "other",
    role: "admin",
    status: 1,
    address: "admin",
    info: new Date()
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

createAdmin();
