import io from '../../app'
import { socketSecretAuthorization } from '../../middleware/auth'

const initialize = () => {
  io.of('/notifications').on('connection', (socket) => {
    socketSecretAuthorization(socket)
  })
}

export default initialize
