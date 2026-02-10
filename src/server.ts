import 'dotenv/config'
import app from './config/app.config'
import http from 'http'
import { Server } from 'socket.io'
import UuidGenerator from './utils/uuid-generator.util'

const PORT = process.env.PORT || 3000

// Entrypoint of the server
const server = http.createServer(app)

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

app.locals.io = io

io.on('connection', (socket) => {
  socket.on('join-room', ({ userId, peerId }) => {
    const roomId = UuidGenerator.generateSocketRoomId(userId, peerId)
    socket.join(roomId)

    socket.emit('connected', { message: `Connected to server. Joined room ${roomId} with peer ${peerId}` })
  })
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
