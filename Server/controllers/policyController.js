const { validationResult } = require("express-validator");
const Policy = require("../models/Policy");

const getPolicies = async (req, res) => {
  const policies = await Policy.find();
  res.json(policies);
};

const getPolicyById = async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  if (!policy) return res.status(404).json({ message: "Policy not found" });
  res.json(policy);
};

const addPolicy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { allowedActions = [], deniedActions = [] } = req.body;
  const intersection = allowedActions.filter((action) =>
    deniedActions.includes(action)
  );

  if (intersection.length) {
    return res.status(400).json({
      message: `Actions cannot be both allowed and denied: ${intersection.join(
        ", "
      )}`,
    });
  }

  const policy = new Policy(req.body);
  await policy.save();
  res.status(201).json(policy);
};

const updatePolicy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { allowedActions = [], deniedActions = [] } = req.body;
  const intersection = allowedActions.filter((action) =>
    deniedActions.includes(action)
  );

  if (intersection.length) {
    return res.status(400).json({
      message: `Actions cannot be both allowed and denied: ${intersection.join(
        ", "
      )}`,
    });
  }

  const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!policy) return res.status(404).json({ message: "Policy not found" });
  res.json(policy);
};

const deletePolicy = async (req, res) => {
  const policy = await Policy.findByIdAndDelete(req.params.id);
  if (!policy) return res.status(404).json({ message: "Policy not found" });
  res.json({ message: "Policy deleted successfully" });
};

module.exports = {
  getPolicies,
  getPolicyById,
  addPolicy,
  updatePolicy,
  deletePolicy,
};
