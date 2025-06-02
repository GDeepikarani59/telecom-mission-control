const express = require("express");
const {
  getTowers,
  getTowerById,
  addTower,
  updateTower,
  deleteTower,
} = require("../controllers/towerController");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const validateTower = [
  body("location").notEmpty().withMessage("Location is required"),
  body("supportedCarriers")
    .isArray()
    .withMessage("supportedCarriers must be an array"),
  body("supportedDevices")
    .isArray()
    .withMessage("supportedDevices must be an array"),
];

router.get("/", getTowers);
router.get("/:id", getTowerById);
router.post("/", validateTower, addTower);
router.put("/:id", validateTower, updateTower);
router.delete("/:id", deleteTower);

module.exports = router;
