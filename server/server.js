const express = require('express')
const cors = require('cors')
const server = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dolmetscher-vermittlungs-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.listen(3333, () => console.log('Server ready on port 3333'))
server.use(express.json())
server.use(cors())
server.set('json spaces', 2)

server.use('/appointments', require('./routes/appointments'))
server.use('/languages', require('./routes/languages'))
server.use('/users', require('./routes/users'))
