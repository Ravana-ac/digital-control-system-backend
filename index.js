import { WebSocketServer } from 'ws'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { setValue, getValue } from './cache_db.js'

import 'dotenv/config.js'

const app = express()

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocketServer({
  server: server,
  path: '/ws',
})
const io = new Server(server, {
  path: '/socket.io',
  cors: { origin: 'http://localhost:5173' },
})

const handleDeviceInput = async (data) => {
  const key = data.id
  await setValue(key, data)
}

const handleLocationRequest = async (key, socket) => {
  const data = await getValue(key)
  console.log(data)
  socket.emit('receve-message', data)
}

wss.on('connection', (socket) => {
  console.log('Clent Connected')

  socket.on('message', async (message) => {
    try {
      const jsonData = JSON.parse(message)
      await handleDeviceInput(jsonData)
      socket.send('OK')
    } catch (error) {
      socket.send('Error')
      console.log(error)
    }
  })
})

io.on('connection', async (socket) => {
  console.log('Client Connected', socket.id)

  socket.on('location-request', async (msg) => {
    handleLocationRequest(msg.id, socket)
  })
})

app.get('/', (req, res) => {
  res.render('pages/index')
})

server.listen(process.env.PORT, () => {
  console.log(`listening on localhost:${process.env.PORT}`)
})
