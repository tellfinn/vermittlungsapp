const mongoose = require('mongoose')

const Appointment = mongoose.model('Appointment', {
  appointmentDate: Date,
  appLanguage: String,
  alternativeAppLanguage: String,
  duration: Number,
  clinic: String,
  station: String,
  favorites: Boolean,
  swornIn: Boolean,
  writtenTranslation: Boolean,
  accepted: Boolean,
  message: String,
  extension: Number,
  contact: String
})

module.exports = Appointment
