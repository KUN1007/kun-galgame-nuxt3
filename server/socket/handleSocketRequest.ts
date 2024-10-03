import { KUNGalgameSocket } from '../plugins/socket.io'
import type { Message } from '~/types/api/chat-message'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()

export const handleSocketRequest = (socket: KUNGalgameSocket) => {
  socket.on('joinChat', (receiverUid: number) => {
    const uid = socket.payload?.uid
    userSockets.set(uid, socket)

    if (uid) {
      const roomId = generateRoomId(uid, receiverUid)
      socket.join(roomId)
    }
  })

  socket.on('sendingMessage', async (message: Message) => {
    const uid = socket.payload?.uid
    const sendingMessageUserSocket = userSockets.get(uid)

    if (sendingMessageUserSocket && uid) {
      const roomId = generateRoomId(uid, message.receiverUid)
      sendingMessageUserSocket.to(roomId).emit('receivedMessage', message)
    }
  })

  socket.on('leaveChat', async (message: Message) => {
    const uid = socket.payload?.uid
    const sendingMessageUserSocket = userSockets.get(uid)

    if (sendingMessageUserSocket && uid) {
      const roomId = generateRoomId(uid, message.receiverUid)
      sendingMessageUserSocket.leave(roomId)
    }
  })
}
