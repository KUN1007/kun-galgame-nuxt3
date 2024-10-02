import { KUNGalgameSocket } from '../plugins/socket.io'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()

export const handleSocketRequest = (socket: KUNGalgameSocket) => {
  socket.on('register', () => {
    const uid = socket.payload?.uid
    userSockets.set(uid, socket)
  })

  socket.on('sendingMessage', async ({ message, uid }) => {
    const sendingMessageUserSocket = userSockets.get(uid)

    if (sendingMessageUserSocket) {
      sendingMessageUserSocket.emit('sentMessage', message)
    }
  })
}
