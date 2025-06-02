const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Policy = require("../models/Policy");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_access_secret"
    );
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

const authorize = (action) => {
  return async (req, res, next) => {
    const { role } = req.user;

    const policy = await Policy.findOne({ role });
    if (!policy) {
      return res.status(403).json({ message: "No policy for this role" });
    }

    const { allowedActions = [], deniedActions = [] } = policy;

    if (deniedActions.includes(action)) {
      return res.status(403).json({ message: `Action "${action}" is denied` });
    }

    if (allowedActions.includes(action)) return next();

    return res
      .status(403)
      .json({ message: `Action "${action}" not permitted` });
  };
};

module.exports = {
  authenticate,
  authorize,
  authorizeRoles,
};
