const mongoose = require('mongoose')

const Appointment = mongoose.model('Appointment', {
  appointmentDate: Date,
  appointmentLanguage: String,
  alternativeLanguage: String,
  duration: Number,
  clinic: String,
  station: String,
  place: String,
  message: String,
  extension: Number,
  contact: String,
  toFavorites: Boolean,
  toSwornIn: Boolean,
  writtenTranslation: Boolean,
  acceptedByInterpreter: Boolean,
  showToInterpreter: String,
  openAppointment: Boolean,
  sentBy: String,
  onlyFemaleInterpreters: Boolean
})

module.exports = Appointment
