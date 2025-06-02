const express = require("express");
const {
  getDevices,
  getDeviceById,
  addDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/deviceController");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/", getDevices);
router.get("/:id", getDeviceById);
router.post("/", addDevice);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);

module.exports = router;
