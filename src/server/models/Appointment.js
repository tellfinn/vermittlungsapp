const mongoose = require('mongoose')

const Appointment = mongoose.model('Appointment', {
  date: Date,
  time: String,
  day: String,
  language: String,
  duration: Number,
  clinic: String,
  house: String,
  swornIn: Boolean,
  writtenTranslations: Boolean,
  message: String
})

module.exports = Appointment
