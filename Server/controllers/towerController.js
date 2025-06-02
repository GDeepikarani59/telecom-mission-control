const Tower = require("../models/Tower");
const { validationResult } = require("express-validator");

const getTowers = async (req, res) => {
  const towers = await Tower.find();
  res.json(towers);
};

const getTowerById = async (req, res) => {
  const tower = await Tower.findById(req.params.id);
  if (!tower) return res.status(404).json({ message: "Tower not found" });
  res.json(tower);
};

const addTower = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const tower = new Tower(req.body);
  await tower.save();
  res.status(201).json(tower);
};

const updateTower = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const tower = await Tower.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!tower) return res.status(404).json({ message: "Tower not found" });
  res.json(tower);
};

const deleteTower = async (req, res) => {
  const tower = await Tower.findByIdAndDelete(req.params.id);
  if (!tower) return res.status(404).json({ message: "Tower not found" });
  res.json({ message: "Tower deleted" });
};

module.exports = {
  getTowers,
  addTower,
  getTowerById,
  updateTower,
  deleteTower,
};
