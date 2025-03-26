const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const { phone, password } = req.body;

  const userExists = await User.findOne({ phone });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ phone, password: hashedPassword });

  if (user) {
    res.json({ phone: user.phone, token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return res.status(401).json({ message: "Invalid phone or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid phone or password" });

  res.json({ phone: user.phone, token: generateToken(user._id) });
};
