import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import dns from "dns";

import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const products = JSON.parse(
  fs.readFileSync(new URL("./products.json", import.meta.url), "utf8"),
);

const categories = JSON.parse(
  fs.readFileSync(new URL("./categories.json", import.meta.url), "utf8"),
);

const seedDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);

    console.log("✅ Connected to MongoDB");

    await productModel.deleteMany({});
    await categoryModel.deleteMany({});

    await categoryModel.insertMany(categories);
    console.log(`✅ ${categories.length} categories inserted`);

    await productModel.insertMany(products);
    console.log(`✅ ${products.length} products inserted`);

    console.log("🎉 Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedDatabase();
