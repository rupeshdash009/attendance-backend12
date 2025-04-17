const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  description: String
});

module.exports = mongoose.model('Course', courseSchema);