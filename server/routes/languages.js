const router = require('express').Router()
const Language = require('../models/Language')

router.get('/', (req, res) => {
  Language.find()
    .then(languages => res.json(languages))
    .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
  Language.find({ _id: req.params.id })
    .then(languages => res.json(languages))
    .catch(err => res.json(err))
})

router.post('/', (req, res) => {
  Language.create(req.body)
    .then(language => res.json(language))
    .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
  Language.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(language => res.json(language))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Language.findByIdAndDelete(req.params.id)
    .then(language => res.json(language))
    .catch(err => res.json(err))
})

module.exports = router
