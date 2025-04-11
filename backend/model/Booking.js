const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import the sequelize instance
const Room = require("./Rooms")

const Booking = sequelize.define('Booking', {
  // Define the columns as per your schema
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  status: {
    type: DataTypes.ENUM('unpaid', 'paid'),
    defaultValue: 'unpaid',
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true, // To create `createdAt` and `updatedAt`
});

Booking.belongsTo(Room, { foreignKey: 'roomId' }); // A booking belongs to a room
Room.hasMany(Booking, { foreignKey: 'roomId' });   // A room can have many bookings

module.exports = Booking;
