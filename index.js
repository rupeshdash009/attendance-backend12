const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Change the connection string as per your database)
mongoose.connect("mongodb://localhost:27017/seatBooking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Booking Schema & Model
const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  seat: Number,
  twelfthPassoutYear: Number,
  percentage12th: Number,
  email: String,
});

const Booking = mongoose.model("Booking", BookingSchema);

// API to Book a Seat
app.post("/api/bookings/book-seat", async (req, res) => {
  const { name, phone, seat, twelfthPassoutYear, percentage12th, email } = req.body;

  if (!seat || !phone) {
    return res.status(400).json({ error: "Seat number and phone number are required" });
  }

  try {
    const newBooking = new Booking({ name, phone, seat, twelfthPassoutYear, percentage12th, email });
    await newBooking.save();

    res.status(201).json({ message: "Seat booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// API to Get All Booked Seats
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({}, "seat");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching seats" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
