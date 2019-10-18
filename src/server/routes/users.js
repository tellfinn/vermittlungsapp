const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/UserSession')

//user sign up

router.post('/signup', (req, res, next) => {
  const { body } = req
  const {
    password,
    firstName,
    lastName,
    isInterpreter,
    phoneNumber,
    languages,
    repeatedPassword
  } = body
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

  if (!phoneNumber) {
    res.send({
      success: false,
      message: 'Bitte geben Sie eine Telefonnummer an.'
    })
  }

  if (!password) {
    res.send({
      success: false,
      message: 'Bitte geben Sie ein Passwort an.'
    })
  }

  if (!repeatedPassword) {
    res.send({
      success: false,
      message: 'Bitte wiederholen Sie das Passwort.'
    })
  }

  if (repeatedPassword !== password) {
    res.send({
      success: false,
      message: 'Passwörter stimmen nicht überein.'
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
      newUser.firstName = firstName
      newUser.lastName = lastName
      newUser.isInterpreter = isInterpreter
      newUser.phoneNumber = phoneNumber
      newUser.languages = languages
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

//user login

router.post('/login', (req, res, next) => {
  const { body } = req
  const { password } = body
  let { email } = body

  if (!email) {
    return res.send({
      success: false,
      message: 'Tragen Sie eine e-Mailadresse ein.'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Tragen Sie ein Passwort ein.'
    })
  }

  email = email.toLowerCase()
  email = email.trim()

  User.find(
    {
      email: email
    },
    (err, users) => {
      if (err) {
        console.log('err 2:', err)
        return res.send({
          success: false,
          message: 'Serverfehler'
        })
      }
      if (users.length !== 1) {
        return res.send({
          success: false,
          message: 'Fehler bei der Zuordnung'
        })
      }
      const user = users[0]
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'ungültiges Passwort'
        })
      } //  correct user
      const userSession = new UserSession()
      userSession.userId = user._id
      userSession.save((err, doc) => {
        if (err) {
          console.log(err)
          return res.send({
            success: false,
            message: 'Serverfehler'
          })
        }
        return res.send({
          success: true,
          message: 'eingeloggt',
          token: doc._id
        })
      })
    }
  )
})

// user logout

router.get('/logout', (req, res, next) => {
  const { query } = req
  const { token } = query

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Serverfehler'
        })
      }
      return res.send({
        success: true,
        message: 'ausgeloggt'
      })
    }
  )
})

// Logout

router.get('/logout', (req, res, next) => {
  const { query } = req
  const { token } = query

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    },

    null,
    (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Serverfehler'
        })
      }

      return res.send({
        success: true,
        message: 'Lougout erfolgreich'
      })
    }
  )
})

// Verifizierung

router.get('/verify', (req, res, next) => {
  const { query } = req
  const { token } = query

  UserSession.find(
    {
      _id: token,
      isDeleted: false
    },
    (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Serverfehler'
        })
      }
      if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid session'
        })
      } else {
        return res.send({
          success: true,
          message: 'Good'
        })
      }
    }
  )
})

module.exports = router
