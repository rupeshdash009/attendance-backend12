const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController"); // ✅ Ensure this path is correct

const router = express.Router();

router.post("/login", loginUser);  // ✅ Ensure loginUser function exists
router.post("/register", registerUser); // ✅ Ensure registerUser function exists

module.exports = router;
