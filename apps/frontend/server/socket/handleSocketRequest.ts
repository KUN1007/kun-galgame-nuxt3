import type { KUNGalgameSocket } from '../plugins/socket.io'
import { sendingMessage } from './service/message-sending'
import { ERROR_CODES } from './error'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()

export const handleSocketRequest = (socket: KUNGalgameSocket) => {
  socket.on('private:join', (receiverUid: number) => {
    const uid = socket.payload?.uid
    if (!uid) {
      socket.emit(ERROR_CODES.MISSING_UID)
      return
    }

    userSockets.set(uid, socket)
    const roomId = generateRoomId(uid, receiverUid)
    socket.join(roomId)
  })

  socket.on('message:sending', async (receiverUid: number, content: string) => {
    const uid = socket.payload?.uid
    const sendingMessageUserSocket = userSockets.get(uid)

    if (!uid) {
      socket.emit(ERROR_CODES.MISSING_UID)
      return false
    }
    if (uid === receiverUid) {
      socket.emit(ERROR_CODES.CANNOT_SEND_MESSAGE_TO_YOURSELF)
      return false
    }
    if (!content.trim().length || content.length > 1007) {
      socket.emit(ERROR_CODES.CONTENT_TOO_LONG)
      return false
    }
    if (!sendingMessageUserSocket) {
      socket.emit(ERROR_CODES.INVALID_SOCKET)
      return false
    }

    const message = await sendingMessage(uid, receiverUid, content)

    const roomId = generateRoomId(uid, receiverUid)
    sendingMessageUserSocket.emit('message:sent', message)
    sendingMessageUserSocket.to(roomId).emit('message:received', message)
  })

  socket.on('private:leave', async () => {
    const uid = socket.payload?.uid

    if (uid) {
      userSockets.delete(uid)
    }
  })
}
