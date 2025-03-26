const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ phone, password: hashedPassword });

    if (user) {
      res.json({ phone: user.phone, token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    res.json({ phone: user.phone, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.signup = (req, res) => {
  res.send("Signup successful!");
};
