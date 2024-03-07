import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
let socket = null

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (soc) => {
  console.log(soc.id)
  socket = soc
})

app.get('/', (req, res) => {
  if (socket) {
    socket.emit('receve_message', { message: 'hello' })
  }
  res.send('<h1>Train Location Tracker</h1>')
})

app.post('/a0', (req, res, next) => {
  console.log(req.body)
  if (socket) {
    socket.emit('receve_message', req.body)
  }
  res.send('OK')
})

server.listen(5000, () => {
  console.log('listening on localhost:5000')
})
