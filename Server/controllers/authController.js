const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateTokens = (user) => {
  const payload = { userId: user._id, role: user.role };

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET || "default_access_secret",
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    }
  );

  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const { role } = user;
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const tokens = generateTokens(user);

  res.json({ tokens, username, role });
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "default_refresh_secret"
    );

    const user = await User.findById(payload.userId);
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
};
