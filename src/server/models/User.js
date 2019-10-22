const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  isInterpreter: { type: Boolean },
  isFavorite: { type: Boolean, default: false },
  isSwornIn: { type: Boolean, default: false },
  writtenTranslations: { type: Boolean, default: false },
  languages: [String],
  isDeleted: { type: Boolean, default: false }
})

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
