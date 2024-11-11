const Booking = require("../model/Booking"); // Adjust the path as necessary
const nodemailer = require("nodemailer")

require("dotenv").config()

// Create a new Booking
const createBooking = async (req, res) => {
  const { startDate, endDate, roomId, guests, name, email, time } = req.body;
  const startDateOnly = new Date(startDate).toLocaleDateString();
  const endDateOnly = new Date(endDate).toLocaleDateString();

  try {
    // Check for missing fields first
    if (!startDate || !endDate || !roomId || !guests || !name || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }
    
    // Create the booking
    const booking = await Booking.create({
      startDate: startDateOnly,
      endDate: endDateOnly,
      guests,
      roomId,
      name,
      time
    });

    //email send
     const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: ""
      }
     })

     const mailOptions = {
      from: 'Br Staycation <no-reply@brstaycation.com>',
      to: `${email}`,
      subject: "Booking Confirmation",
      text: `Hello ${name}, \n\n
      Your booking is confirmed please pay the required 50% downpayment \n\n
      Room no: ${roomId} \n\n
      Check-in: ${startDateOnly} \n\n
      Check-out: ${endDateOnly}\n\n
      Check-out: ${time}
      `
     }

     const info = await transporter.sendMail(mailOptions)

     console.log("Message sent: %s", info.message)
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))


    // Respond with the created booking
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Get all Bookings
const getBookings = async (req, res) => {
  try {
    const Bookings = await Booking.find({});
    res.status(200).json(Bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Booking
const getBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!Booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Booking
const updateBooking = async (req, res) => {
  const { id } = req.params;

  const updateFields = { status: req.body.status };
  try {
    const booking = await Booking.findByIdAndUpdate(id, updateFields, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  console.log("Booking ID received for update:", id)
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
