const mongoose = require('mongoose')

const User = mongoose.model('User', {
  lastName: String,
  firstName: String,
  languages: [String],
  writtenTranslations: Boolean,
  swornIn: Boolean,
  phoneNumber: Number,
  eMailAdress: String
})

module.exports = User
