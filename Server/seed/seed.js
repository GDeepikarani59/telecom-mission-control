require("dotenv").config();
const mongoose = require("mongoose");
const Policy = require("../models/models/Policy");
const User = require("../models/models/User");
const connectDB = require("../config/db");

const seedData = async () => {
  await connectDB();
  await Policy.deleteMany({});
  await User.deleteMany({});

  const policies = [
    {
      appName: "AppOne",
      role: "admin",
      allowedActions: ["read", "write", "delete"],
      deniedActions: [],
    },
    {
      appName: "AppTwo",
      role: "user",
      allowedActions: ["read"],
      deniedActions: ["delete"],
    },
  ];

  const users = [
    {
      username: "admin",
      password: "admin123",
      role: "admin",
    },
    {
      username: "user",
      password: "user123",
      role: "user",
    },
  ];

  await Policy.insertMany(policies);
  await User.insertMany(users);

  console.log("✅ Database Seeded Successfully!");
  process.exit();
};

seedData().catch((err) => {
  console.error("❌ Seed Failed:", err);
  process.exit(1);
});
