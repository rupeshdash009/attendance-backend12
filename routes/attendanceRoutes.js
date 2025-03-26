const express = require("express");
const Attendance = require("../models/Attendance");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Mark Attendance
router.post("/mark", protect, async (req, res) => {
  const { studentName, rollNumber, course, semester, status } = req.body;

  try {
    const newAttendance = new Attendance({ studentName, rollNumber, course, semester, status });
    await newAttendance.save();
    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
});

// Get Attendance List
router.get("/", protect, async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
});

module.exports = router;
