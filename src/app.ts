import { createServer } from 'http'
import { Server } from 'socket.io'
import { config } from 'dotenv'

config()

import Logger from './services/logger'

const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 3001
const logger = Logger('Socket.io Server')

const httpServer = createServer()

const io = new Server(httpServer, {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
})

io.on('connection', (socket) => {
  const authSecret = socket.handshake.auth.secret
  logger.info(`New socket id: ${socket.id} has been connected`)

  socket.on('disconnect', (reason) => {
    logger.info(
      `Socket id: ${socket.id} has been disconnected due to: ${reason}`
    )
  })

  if (!authSecret || authSecret !== process.env.SOCKETIO_SECRET) {
    socket.disconnect(true)
  }
})

httpServer.listen(port, () => {
  logger.info(`Web server is up and running on http://localhost:${port}`)
})
