import 'dotenv/config.js'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { setValue, getValue } from './cache_db.js'
import { WebSocketServer } from 'ws'
import http from 'http'
import app from './app.js'

const CONN_STR = process.env.MONGODB_CONN_STRING
const PORT = process.env.PORT

const server = http.createServer(app)

const wss = new WebSocketServer({
  server: server,
  path: '/ws',
})
const io = new Server(server, {
  path: '/socket.io',
  cors: { origin: '*' },
})

const handleDeviceInput = async (data) => {
  const key = data.id
  await setValue(key, data)
}

const handleLocationRequest = async (key, socket) => {
  const data = await getValue(key)
  socket.emit('receve-message', data)
}

wss.on('connection', (socket) => {
  console.log('Clent Connected')

  socket.on('message', async (message) => {
    try {
      const jsonData = JSON.parse(message)
      console.log(jsonData)
      await handleDeviceInput(jsonData)
      socket.send('Hello')
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

mongoose.connect(CONN_STR).then(() => {
  console.log('Database Connection - OK')
  server.listen(PORT, () => {
    console.log('Server is listning on port:', PORT)
  })
})
