const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/UserSession')

//user sign up

router.post('/register', (req, res) => {
  const { body } = req
  const {
    password,
    firstName,
    lastName,
    isInterpreter,
    phoneNumber,
    languages,
    repeatedPassword,
    writtenTranslations,
    isFavourite,
    isSwornIn
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
    }
  )

  // save new user
  const newUser = new User()

  newUser.email = email
  newUser.password = newUser.generateHash(password)
  newUser.firstName = firstName
  newUser.lastName = lastName
  newUser.isInterpreter = isInterpreter
  newUser.phoneNumber = phoneNumber
  newUser.languages = languages
  newUser.isSwornIn = isSwornIn
  newUser.writtenTranslations = writtenTranslations
  newUser.isFavourite = isFavourite

  newUser
    .save(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
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
      } //  current user
      const userSession = new UserSession()
      userSession.userID = user._id
      userSession.userLang = user.languages
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Serverfehler'
          })
        }
        return res.send({
          success: true,
          message: 'eingeloggt',
          token: doc._id,
          userID: userSession.userID,
          userLang: userSession.userLang
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

// user finden

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
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

module.exports = router
