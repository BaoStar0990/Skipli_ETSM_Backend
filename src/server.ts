import 'dotenv/config'
import app from './config/app.config'
import http from 'http'
import { Server } from 'socket.io'
import ObjectModerator from './utils/object-moderator.util'

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
    console.log(`User ${userId} connected and joining room with peer ${peerId}`)
    socket.join(ObjectModerator.generateSocketRoomId(userId, peerId))
  })
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
