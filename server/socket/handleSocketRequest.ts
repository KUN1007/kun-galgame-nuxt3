import { sendingMessage } from './service/message-sending'
import { ERROR_CODES } from './error'
import type { KUNGalgameSocket, OnlineUserCount } from './socket'
import type { Server } from 'socket.io'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()
const onlineClients = new Map<string, string | null>()
const THROTTLE_INTERVAL = 5000
let updateTimeout: NodeJS.Timeout | null = null

const broadcastCount = (io: Server) => {
  const userIds = new Set<string>()
  let guestCount = 0
  onlineClients.forEach((userId) => {
    if (userId) userIds.add(userId)
    else guestCount++
  })
  const userCount = userIds.size
  const totalCount = userCount + guestCount
  io.emit('update:online:count', {
    total: totalCount,
    user: userCount,
    guest: guestCount
  } satisfies OnlineUserCount)
}

const scheduleBroadcast = (io: Server) => {
  if (updateTimeout) {
    return
  }
  updateTimeout = setTimeout(() => {
    broadcastCount(io)
    updateTimeout = null
  }, THROTTLE_INTERVAL)
}

const handlePrivateChat = (io: Server, socket: KUNGalgameSocket) => {
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

const handleOnlinePresence = (io: Server, socket: KUNGalgameSocket) => {
  const initialUserId = socket.payload?.uid ? String(socket.payload.uid) : null
  onlineClients.set(socket.id, initialUserId)
  scheduleBroadcast(io)

  socket.on('login', () => {
    const loggedInUserId = socket.payload?.uid
      ? String(socket.payload.uid)
      : null
    if (loggedInUserId) {
      onlineClients.set(socket.id, loggedInUserId)
      scheduleBroadcast(io)

      handlePrivateChat(io, socket)
    }
  })

  socket.on('logout', () => {
    if (onlineClients.has(socket.id)) {
      onlineClients.set(socket.id, null)
      scheduleBroadcast(io)

      socket.removeAllListeners('private:join')
      socket.removeAllListeners('message:sending')
      socket.removeAllListeners('private:leave')
    }
  })

  socket.on('disconnect', () => {
    onlineClients.delete(socket.id)
    if (socket.payload?.uid) {
      userSockets.delete(socket.payload.uid)
    }
    scheduleBroadcast(io)
  })
}

export const handleSocketRequest = (io: Server, socket: KUNGalgameSocket) => {
  handleOnlinePresence(io, socket)

  if (socket.payload?.uid) {
    handlePrivateChat(io, socket)
  }
}
