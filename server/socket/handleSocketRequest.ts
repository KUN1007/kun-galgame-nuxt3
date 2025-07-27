import { sendingMessage } from './service/message-sending'
import { ERROR_CODES } from './error'
import type { KUNGalgameSocket, OnlineUserCount } from './socket'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()
const onlineClients = new Map<string, string | null>()

const calculateOnlineCount = (): OnlineUserCount => {
  const userIds = new Set<string>()
  let guestCount = 0
  onlineClients.forEach((userId) => {
    if (userId) userIds.add(userId)
    else guestCount++
  })
  const userCount = userIds.size
  const totalCount = userCount + guestCount
  return {
    total: totalCount,
    user: userCount,
    guest: guestCount
  }
}

const handlePrivateChat = (socket: KUNGalgameSocket) => {
  const uid = socket.payload?.uid
  if (!uid) {
    return
  }

  socket.on('private:join', (receiverUid: number) => {
    userSockets.set(uid, socket)
    const roomId = generateRoomId(uid, receiverUid)
    socket.join(roomId)
  })

  socket.on('message:sending', async (receiverUid: number, content: string) => {
    const sendingMessageUserSocket = userSockets.get(uid)

    if (uid === receiverUid) {
      return socket.emit(ERROR_CODES.CANNOT_SEND_MESSAGE_TO_YOURSELF)
    }
    if (!content.trim().length || content.length > 1007) {
      return socket.emit(ERROR_CODES.CONTENT_TOO_LONG)
    }
    if (!sendingMessageUserSocket) {
      return socket.emit(ERROR_CODES.INVALID_SOCKET)
    }

    const message = await sendingMessage(uid, receiverUid, content)
    const roomId = generateRoomId(uid, receiverUid)
    sendingMessageUserSocket.emit('message:sent', message)
    sendingMessageUserSocket.to(roomId).emit('message:received', message)
  })

  socket.on('private:leave', async () => {
    userSockets.delete(uid)
  })
}

export const handleSocketRequest = (socket: KUNGalgameSocket) => {
  const initialUserId = socket.payload?.uid ? String(socket.payload.uid) : null
  onlineClients.set(socket.id, initialUserId)

  if (socket.payload?.uid) {
    handlePrivateChat(socket)
  }

  socket.on('get:online:count', () => {
    socket.emit('update:online:count', calculateOnlineCount())
  })
}
