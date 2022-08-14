import io from '../../app'
import { socketSecretAuthorization } from '../../middleware/auth'

const initialize = () => {
  io.of('/chat').on('connection', (socket) => {
    socketSecretAuthorization(socket)
  })
}

export default initialize
