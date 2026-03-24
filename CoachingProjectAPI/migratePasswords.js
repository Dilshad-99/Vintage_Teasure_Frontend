import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import UserSchemaModel from './32_User.model_express.js';
import './32_connection_express.js';

const migrate = async () => {
  console.log("🔄 Starting password migration...");

  const users = await UserSchemaModel.find({});
  let migrated = 0;
  let skipped  = 0;

  for (const user of users) {
    if (user.password && user.password.startsWith('$2b$')) {
      console.log(`⏭️  Already hashed: ${user.email}`);
      skipped++;
      continue;
    }

    const hashed = await bcrypt.hash(user.password, 10);
    await UserSchemaModel.updateOne(
      { _id: user._id },
      { $set: { password: hashed } }
    );
    console.log(`✅ Migrated: ${user.email}`);
    migrated++;
  }

  console.log(`\n🎉 Done! Migrated: ${migrated}, Skipped: ${skipped}`);
  mongoose.connection.close();
  process.exit(0);
};

migrate().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});