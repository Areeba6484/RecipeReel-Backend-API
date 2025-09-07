import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedUsers } from "./users.seeder.js";
import { seedRecipes } from "./recipes.seeder.js";
import { seedReviews } from "./reviews.seeder.js";
import { seedCategories } from "./categories.seeder.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const runSeeders = async () => {
  await connectDB();
  await seedUsers();
  await seedRecipes();
  await seedReviews();
  await seedCategories();
  mongoose.connection.close();
};

runSeeders();