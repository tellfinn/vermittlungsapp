const mongoose = require('mongoose')

const Language = mongoose.model('Language', {
  name: String,
  alternativeName: [String]
})

module.exports = Language
