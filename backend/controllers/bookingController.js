const Booking = require("../model/Booking"); // Import the Sequelize model
const { Sequelize } = require("sequelize")
const { sequelize } = require("../config/database")

// Create a new booking
const createBooking = async (req, res) => {
  console.log("Request received:", req.body);
  
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  const { roomId } = req.query;

  try {
    const bookings = roomId
      ? await Booking.findAll({ where: { roomId } })
      : await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get a single booking by ID
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await booking.update(req.body);
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Failed to update booking" });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await booking.destroy();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};

const getBookingsForYear = async (req, res) => {
  const year = req.query.year || new Date().getFullYear(); // Default to current year if no year provided

  const query = `
    SELECT "createdAt" 
    FROM public."Bookings"
    WHERE EXTRACT(YEAR FROM "createdAt") = :year
    ORDER BY id ASC
  `;

  try {
    const bookings = await sequelize.query(query, {
      replacements: { year },  // Safe parameter substitution
      type: Sequelize.QueryTypes.SELECT, // Specify that the query will return rows
    });

    res.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res.status(500).json({ error: "Error fetching bookings" });
  }
};

const getRoomByBookings = async (req, res) => {
  const year = req.query.year || new Date().getFullYear()

  const query = `
  SELECT "createdAt", "roomId"
  FROM public."Bookings"
  WHERE EXTRACT(YEAR FROM "createdAt") = :year
  ORDER BY id ASC`

  try {
    const bookings = await sequelize.query(query, {
      replacements: {year},
      type: Sequelize.QueryTypes.SELECT
    })

    res.status(200).json({ bookings })
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" })
  }
}

const getBookingByEmail = async (req, res) => {
  const email = req.query.email || new Date().getFullYear()

  const query = `
  SELECT *
  FROM public."Bookings"
  WHERE "email" = :email
  ORDER BY id ASC`

  try {
    const bookings = await sequelize.query(query, {
      replacements: {email},
      type: Sequelize.QueryTypes.SELECT
    })

    res.status(200).json({ bookings })
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" })
  }
}


// Export all controller functions
module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingsForYear,
  getRoomByBookings,
  getBookingByEmail
};
