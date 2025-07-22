import env from '../env/dotenv'
import jwt from 'jsonwebtoken'
import { parse } from 'cookie-es'
import { Server as Engine } from 'engine.io'
import { Server } from 'socket.io'
import { defineEventHandler } from 'h3'
import { handleSocketRequest } from '~/server/socket/handleSocketRequest'
import { isBotAgent } from '~/utils/validate'
import type { NitroApp } from 'nitropack'
import type { KUNGalgamePayload } from '~/types/utils/jwt'
import type { KUNGalgameSocket } from '../socket/socket'

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine()
  const io = new Server()

  io.bind(engine)

  io.use((socket: KUNGalgameSocket, next) => {
    const userAgent = socket.request.headers['user-agent'] || ''
    if (isBotAgent.test(userAgent)) {
      return next(new Error('Bot access Socket.IO denied'))
    }

    try {
      const token = parse(socket.request.headers.cookie || '')
      const refreshToken = token['kungalgame-moemoe-refresh-token']

      if (refreshToken) {
        const payload = jwt.verify(
          refreshToken,
          env.JWT_SECRET || ''
        ) as KUNGalgamePayload
        socket.payload = payload
      }

      next()
    } catch (error) {
      next()
    }
  })

  io.on('connection', (socket: KUNGalgameSocket) => {
    handleSocketRequest(io, socket)
  })

  nitroApp.router.use(
    '/socket.io/',
    defineEventHandler({
      handler(event) {
        // event.node.req.context = event.context
        // @ts-expect-error private method
        engine.handleRequest(event.node.req, event.node.res)
        event._handled = true
      }
    })
  )
})
