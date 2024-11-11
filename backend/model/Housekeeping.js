const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const housekeepingScheduleSchema = new Schema(
    {
      roomId: { type: Number }, 
      dateToBeCleaned: { type: Date }
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('Housekeeping', housekeepingScheduleSchema)