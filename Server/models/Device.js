const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  os: { type: String, required: true },
  carrier: String,
  userId: String,
  towerId: { type: mongoose.Schema.Types.ObjectId, ref: "Tower" },
});

module.exports = mongoose.model("Device", deviceSchema);
