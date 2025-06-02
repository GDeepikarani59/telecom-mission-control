const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  appName: String,
  role: String,
  allowedActions: [String],
  deniedActions: [String],
});

module.exports = mongoose.model("Policy", policySchema);
