const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create a new booking
router.post("/book-seat", async (req, res) => {
  try {
    const { name, phone, twelfthPassoutYear, percentage12th, email, seat } = req.body;

    // Validate percentage
    if (percentage12th < 45) {
      return res.status(400).json({ message: "Sorry, you are not eligible for seat booking due to low percentage." });
    }

    // Validate passout year
    const currentYear = new Date().getFullYear();
    if (twelfthPassoutYear > currentYear) {
      return res.status(400).json({ message: "The passout year cannot be in the future." });
    }

    const newBooking = new Booking({ name, phone, twelfthPassoutYear, percentage12th, email, seat });
    await newBooking.save();
    
    res.status(201).json({ message: "Seat booked successfully", booking: newBooking });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
