import jwt from 'jsonwebtoken'
import { defineIOHandler } from '../../modules/socket/runtime/helpers'
import { parse } from 'cookie-es'
import env from '../env/dotenv'
import type { KUNGalgamePayload } from '../../types/utils/jwt'
import type { Socket } from 'socket.io'

const userSockets = new Map<number | undefined, KUNGalgameSocket>()

interface KUNGalgameSocket extends Socket {
  payload?: KUNGalgamePayload
}

export default defineIOHandler((io) => {
  io.use((socket: KUNGalgameSocket, next) => {
    const token = parse(socket.request.headers.cookie || '')
    const refreshToken = token['kungalgame-moemoe-refresh-token']

    try {
      const payload = jwt.verify(
        refreshToken,
        env.JWT_SECRET || ''
      ) as KUNGalgamePayload
      socket.payload = payload
      next()
    } catch (error) {
      return
    }
  })

  io.on('connection', (socket: KUNGalgameSocket) => {
    socket.on('register', () => {
      const uid = socket.payload?.uid
      userSockets.set(uid, socket)
    })

    socket.on('upvote', (uid: number) => {
      const upvotedUserSocket = userSockets.get(uid)
      const username = socket.payload?.name

      if (upvotedUserSocket) {
        upvotedUserSocket.emit('upvoted', username)
      }
    })

    socket.on('like', (uid: number) => {
      const likedUserSocket = userSockets.get(uid)
      const username = socket.payload?.name

      if (likedUserSocket) {
        likedUserSocket.emit('liked', username)
      }
    })

    socket.on('reply', (uid: number) => {
      const repliedUserSocket = userSockets.get(uid)
      const username = socket.payload?.name

      if (repliedUserSocket) {
        repliedUserSocket.emit('replied', username)
      }
    })

    socket.on('comment', (uid: number) => {
      const commentedUserSocket = userSockets.get(uid)
      const username = socket.payload?.name

      if (commentedUserSocket) {
        commentedUserSocket.emit('commented', username)
      }
    })
  })
})
