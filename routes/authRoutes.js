const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // ✅ Import controller

// ✅ Ensure the functions exist in the controller
router.post("/signup", authController.signup);
router.post("/login", authController.loginUser);

module.exports = router;

