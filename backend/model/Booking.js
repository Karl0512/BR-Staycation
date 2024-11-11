const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
      roomId: { type: Number }, 
      name: { type: String },
      startDate: { type: String, required: true }, 
      endDate: { type: String, required: true },
      time: { type: String },
      guests: { type: Number, required: true, min: 1 , max: 2},
      status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('Booking', bookingSchema)