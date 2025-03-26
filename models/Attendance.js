const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
