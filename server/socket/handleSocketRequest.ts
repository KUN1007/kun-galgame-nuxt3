import { KUNGalgameSocket } from '../plugins/socket.io'
import type { Message } from '~/types/api/chat-message'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()

export const handleSocketRequest = (socket: KUNGalgameSocket) => {
  socket.on('register', () => {
    const uid = socket.payload?.uid
    userSockets.set(uid, socket)
  })

  socket.on('sendingMessage', async (message: Message) => {
    const sendingMessageUserSocket = userSockets.get(message.receiverUid)

    if (sendingMessageUserSocket) {
      sendingMessageUserSocket.emit('receivedMessage', message)
    }
  })
}
