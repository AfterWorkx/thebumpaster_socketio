import { Socket } from 'socket.io'
import Logger from '../services/logger'

const logger = Logger('Auth Middleware')

export const socketSecretAuthorization = (socket: Socket) => {
  const authSecret = socket.handshake.auth.secret
  logger.info(
    `New socket id: ${socket.id} has been connected to namespace: ${socket.nsp.name}`
  )

  socket.on('disconnect', (reason) => {
    logger.info(
      `Socket id: ${socket.id} has been disconnected due to: ${reason}`
    )
  })

  if (!authSecret || authSecret !== process.env.SOCKETIO_SECRET) {
    socket.disconnect(true)
  }
}
