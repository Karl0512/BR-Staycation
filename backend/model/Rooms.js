const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
      roomNumber: { type: String, required: true, unique: true },
      price: { type: Number, required: true },
    },
    { timestamps: true }
  )
  module.exports = mongoose.model('Room', roomSchema)