require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Booking = require("./model/Booking");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomsRoutes = require("./routes/roomsRoutes");
const paymentRoutes = require("./routes/paymentLinkRoutes")
const bodyParser = require('body-parser');
const webhook = require("./routes/paymentLinkRoutes")
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser");

// Database connection
const { sequelize } = require("./config/database");

// Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'https://br-staycation.vercel.app/', // Allow all origins for testing purposes
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], // Allow necessary HTTP methods
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes)


app.post('/', async (req, res) => {
  const event = req.body;

  console.log('Received event:', JSON.stringify(event, null, 2));

  const eventType = event.data.attributes?.type;
  console.log(eventType)
  if (eventType === 'checkout_session.payment.paid') {
    const paymentData = event.data.attributes.data;
    //console.log(paymentData)
    const metadata = paymentData.attributes?.metadata;
    //console.log(metadata)

    if (!metadata || !metadata.startDate || !metadata.endDate || !metadata.roomId) {
      console.error('Booking details not found in metadata.');
      res.status(400).send('Missing booking details.');
      return;
    }

    try {
      // Create the booking in the database
      const booking = await Booking.create({
        name: metadata.name,
        roomId: metadata.roomId,
        startDate: metadata.startDate,
        endDate: metadata.endDate,
        price: metadata.price,
        time: metadata.time,
        roomId: metadata.roomId,
        guests: metadata.guests,
        status: 'paid',
      });

      // Send email receipt
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

      const mailOptions = {
        from: '"BR Staycation" <noreply@brstaycation.com>',
        to: metadata.email,
        subject: "Booking Confirmation - BR Staycation",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #4caf50; text-align: center;">✅ Payment Successful</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for booking with <strong>BR Staycation</strong>! Here’s your receipt:</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Room</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${metadata.roomId}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-in</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${metadata.startDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-out</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${metadata.endDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${metadata.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Guests</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${metadata.guests}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">₱${metadata.price}</td>
            </tr>
          </table>

          <p style="margin-top: 20px;">If you have any questions, just reply to this email. We’re happy to help!</p>

          <p style="margin-top: 20px;">Enjoy your stay! 🏖<br/>— BR Staycation</p>
        </div>
      </div>

        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);

      console.log('Booking successfully created for:', metadata);
    } catch (error) {
      console.error('Error creating booking:', error.message);
      res.status(500).send('Error creating booking.');
      return;
    }
  } else {
    console.log('Unhandled event type:', eventType);
  }

  res.status(200).send('Event received');
});


// Connect to PostgreSQL and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the PostgreSQL database successfully.");
    await sequelize.sync({ alter: true}); // Ensures models are synced to the database

    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log("Server is running on port", process.env.PORT);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
