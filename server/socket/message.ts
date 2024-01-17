import { defineIOHandler } from 'nuxt3-socket.io/helpers'

const userSockets = new Map()

export default defineIOHandler((io) => {
  // io.use((socket, next) => {
  //   const token = socket.handshake.auth.token
  //   jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
  //     if (err) {
  //       return next(new Error('Authentication error'))
  //     }
  //     socket.decoded = decoded
  //     next()
  //   })
  // })

  io.on('connection', (socket) => {
    socket.on('register', (userId: number) => {
      userSockets.set(userId, socket)
    })

    socket.on('like', (userId: number) => {
      const likedUserSocket = userSockets.get(userId)

      if (likedUserSocket) {
        likedUserSocket.emit('liked', userId)
      }
    })
  })
})
