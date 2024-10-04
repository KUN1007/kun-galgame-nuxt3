import ChatMessageModel from '~/server/models/chat-message'
import { KUNGalgameSocket } from '../plugins/socket.io'
import type { Message } from '~/types/api/chat-message'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()

export const handleSocketRequest = (socket: KUNGalgameSocket) => {
  socket.on('private:join', (receiverUid: number) => {
    const uid = socket.payload?.uid
    userSockets.set(uid, socket)

    if (uid) {
      const roomId = generateRoomId(uid, receiverUid)
      socket.join(roomId)
    }
  })

  socket.on(
    'message:read',
    async (receiverUid: number, cmidArray: number[]) => {
      const uid = socket.payload?.uid
      const sendingMessageUserSocket = userSockets.get(uid)
      if (!uid || !sendingMessageUserSocket) {
        return
      }
      const roomId = generateRoomId(uid, receiverUid)

      await ChatMessageModel.updateMany(
        {
          cmid: { $in: cmidArray },
          'read_by.uid': { $ne: uid }
        },
        {
          $push: { read_by: { uid: uid, read_time: Date.now() } }
        }
      )

      socket.to(roomId).emit('message:read:update', cmidArray)
    }
  )

  socket.on('message:sending', async (message: Message) => {
    const uid = socket.payload?.uid
    const sendingMessageUserSocket = userSockets.get(uid)

    if (sendingMessageUserSocket && uid) {
      const roomId = generateRoomId(uid, message.receiverUid)
      sendingMessageUserSocket.to(roomId).emit('message:received', message)
    }
  })

  socket.on('private:leave', async () => {
    const uid = socket.payload?.uid

    if (uid) {
      userSockets.delete(uid)
    }
  })
}
