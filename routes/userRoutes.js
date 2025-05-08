// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path to your User model

router.get('/', async (req, res) => {
  const { program, year, semester } = req.query;
  try {
    const users = await User.find({ program, year, semester });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

module.exports = router;
