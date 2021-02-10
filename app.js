const express = require('express')
require('dotenv').config()
const app = express()

const routesNavigation = require('./src/routesNavigation')

const morgan = require('morgan')
app.use(morgan('dev'))
app.use('/apikerjain/fileUploadsApiKerjain', express.static('uploads'))
const socket = require('socket.io')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const cors = require('cors')
app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})

const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/apikerjain/socket.io'
})

io.on('connection', (socket) => {
  console.log('masuk connection')
  socket.on('globalMessage', (data) => {
    io.emit('chatMessage', data)
  })
  socket.on('joinRoom', (data) => {
    console.log(data)
    console.log('vincent syahadat')
    socket.join(data.room)
  })
  socket.on('roomMessage', (data) => {
    io.to(data.room_chat).emit('chatMessage', data)
  })
  socket.on('changeRoom', (data) => {
    console.log(data)
    socket.leave(data.oldRoom)
    socket.join(data.room_chat)
  })
})

app.use('/apikerjain', routesNavigation)

app.get('*', (request, response) => {
  response.status(404).send('Path not found !')
})

server.listen(3000, () => {
  console.log('Express app is listening on port 3000')
})
