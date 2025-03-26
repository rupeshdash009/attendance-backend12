const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userType: { type: String, enum: ["student", "teacher"], required: true },
  fullName: { type: String, required: true },
  rollNumber: { type: String, required: function() { return this.userType === "student"; } },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
