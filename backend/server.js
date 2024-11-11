require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes')
const roomsRoutes = require('./routes/roomsRoutes')
const nodemailer = require('nodemailer')
const cors = require('cors')
const housekeepingRoutes = require('./routes/housekeepingRoutes')

//express app
const app = express();

// middleware
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/bookings", bookingRoutes)
app.use("/api/rooms", roomsRoutes)
app.use("/api/users", userRoutes);
app.use("/api/housekeeping", housekeepingRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
