import { createServer } from 'http'
import { Server } from 'socket.io'
import { config } from 'dotenv'
import Logger from './services/logger'
import { socketSecretAuthorization } from './middleware/auth'

import initializeNotifications from './namespaces/notifications'
import initializeChat from './namespaces/chat'

config()

const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 3001
const logger = Logger('Socket.io Server')

const httpServer = createServer()

const io = new Server(httpServer, {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
})

io.on('connection', (socket) => {
  socketSecretAuthorization(socket)
})

httpServer.listen(port, () => {
  logger.info(`Web server is up and running on http://localhost:${port}`)

  initializeNotifications()
  initializeChat()
})

export default io
