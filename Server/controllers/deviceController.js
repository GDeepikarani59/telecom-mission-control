const Device = require("../models/Device");

const getDevices = async (req, res) => {
  const devices = await Device.find().populate("towerId");
  res.json(devices);
};
const getDeviceById = async (req, res) => {
  const device = await Device.findById(req.params.id).populate("towerId");
  if (!device) return res.status(404).json({ message: "Device not found" });
  res.json(device);
};
const addDevice = async (req, res) => {
  const device = new Device(req.body);
  await device.save();
  res.status(201).json(device);
};
const updateDevice = async (req, res) => {
  const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!device) return res.status(404).json({ message: "Device not found" });
  res.json(device);
};

const deleteDevice = async (req, res) => {
  const device = await Device.findByIdAndDelete(req.params.id);
  if (!device) return res.status(404).json({ message: "Device not found" });
  res.json({ message: "Device deleted" });
};

module.exports = {
  getDevices,
  addDevice,
  getDeviceById,
  deleteDevice,
  updateDevice,
};
