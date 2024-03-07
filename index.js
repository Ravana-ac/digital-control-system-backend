import { WebSocketServer } from 'ws'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const wss = new WebSocketServer({ server: server })

wss.on('connection', (socket) => {
  console.log('Clent Connected')

  socket.on('message', (message) => {
    try {
      const jsonData = JSON.parse(message)
      console.log(jsonData)
      socket.send('OK')
    } catch (error) {
      socket.send('Error')
      console.log(error)
    }
  })
})

app.get('/', (req, res) => {
  res.render('pages/index')
})

server.listen(5000, () => {
  console.log('listening on localhost:5000')
})
