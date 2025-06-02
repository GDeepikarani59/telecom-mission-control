const mongoose = require("mongoose");

const towerSchema = new mongoose.Schema({
  location: String,
  supportedCarriers: [String],
  supportedDevices: [String],
});

module.exports = mongoose.model("Tower", towerSchema);
