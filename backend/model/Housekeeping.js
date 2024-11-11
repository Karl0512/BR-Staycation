const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const housekeepingScheduleSchema = new Schema(
    {
      customerName: { type: String },
      bookingId: { type: String },
      roomId: { type: Number }, 
      dateToBeCleaned: { type: String },
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('Housekeeping', housekeepingScheduleSchema)