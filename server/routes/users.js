const router = require('express').Router()
const saveFile = require('../utils/saveFile')

function saveUsers(data) {
  return saveFile('users.json', data)
}

let users
try {
  users = require('../data/users.json').map(user => {
    return { id: uid(), ...user }
  })
} catch {
  users = []
}

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/:id', (req, res) => {
  res.json(users.find(user => user.id === req.params.id))
})

router.post('/', (req, res) => {
  const newUser = { ...req.body, id: uid() }
  users.push(newUser)
  saveUsers(users)
    .then(() => res.json(newUser))
    .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
  const index = users.findIndex(user => user.id === req.params.id)
  const changedUser = { ...users[index], ...req.body }
  users[index] = changedUser
  saveUsers(users)
    .then(() => res.json(changedUser))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const deletedUser = users.find(user => user.id === id)
  users = users.filter(user => user.id !== id)
  saveUsers(users)
    .then(() => res.json(deletedUser))
    .catch(err => res.json(err))
})

module.exports = router
