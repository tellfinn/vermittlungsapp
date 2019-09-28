const mongoose = require('mongoose')

const Appointment = mongoose.model('Appointment', {
  date: Date,
  time: Date,
  day: String,
  language: String,
  duration: Number,
  address: String,
  addressShortened: String,
  message: String
})

module.exports = Appointment
