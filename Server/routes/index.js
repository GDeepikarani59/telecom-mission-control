const express = require("express");
const router = express.Router();

const towerRoutes = require("./towerRoutes");
const deviceRoutes = require("./deviceRoutes");
const policyRoutes = require("./policyRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

router.use("/towers", towerRoutes);
router.use("/devices", deviceRoutes);
router.use("/policies", policyRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
module.exports = router;
