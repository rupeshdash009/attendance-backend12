const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  program: { type: String, required: true }, // BBA, BCA, etc.
  year: { type: String, required: true }, // 1st, 2nd, 3rd year
  semester: { type: String, required: true }, // 1st to 8th
  rollNumber: { type: String, required: true } // Student roll number
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
