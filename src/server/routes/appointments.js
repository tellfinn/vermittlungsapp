const router = require('express').Router()
const Appointment = require('../models/Appointment')

router.get('/', (req, res) => {
  Appointment.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
  Appointment.find({ id: req.params.id })
    .then(appointments => res.json(appointments))
    .catch(err => res.json(err))
})

router.post('/', (req, res) => {
  Appointment.create(req.body)
    .then(appointment => res.json(appointment))
    .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(appointment => res.json(appointment))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(err => res.json(err))
})

module.exports = router
