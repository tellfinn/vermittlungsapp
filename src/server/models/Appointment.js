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
  message: String,
  accepted: Boolean
})

module.exports = Appointment
