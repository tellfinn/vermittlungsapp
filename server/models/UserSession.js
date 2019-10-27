const mongoose = require('mongoose')

const UserSessionSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: ''
  },
  userLang: {
    type: Array
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('UserSession', UserSessionSchema)
