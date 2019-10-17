const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
  User.find({ _id: req.params.id })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

//user sign up

router.post('/', (req, res, next) => {
  const { body } = req
  const { password, firstName, lastName } = body
  let { email } = body

  if (!firstName) {
    res.send({
      success: false,
      message: 'Bitte geben Sie Ihren Vornamen an.'
    })
  }
  if (!lastName) {
    res.send({
      success: false,
      message: 'Bitte geben Sie Ihren Nachnamen an.'
    })
  }

  if (!email) {
    res.send({
      success: false,
      message: 'Bitte geben Sie eine e-Mailadresse an.'
    })
  }

  if (!password) {
    res.send({
      success: false,
      message: 'Bitte geben Sie ein Passwort an.'
    })
  }

  email = email.toLowerCase()
  email = email.trim()

  // verify email

  User.find(
    {
      email: email
    },
    (err, existingUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Serverfehler'
        })
      } else if (existingUsers.length > 0) {
        res.send({
          success: false,
          message: 'ein Account mit dieser e-Mailadresse existiert bereits.'
        })
      }

      // save new user
      const newUser = new User()

      newUser.email = email
      newUser.password = newUser.generateHash(password)
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Es ist ein Fehler aufgetreten (Serverfehler).'
          })
        } else {
          return res.send({
            success: true,
            message: 'Registrierung erfolgreich'
          })
        }
      })
    }
  )
})

module.exports = router
