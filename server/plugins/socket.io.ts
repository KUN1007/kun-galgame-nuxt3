import env from '../env/dotenv'
import jwt from 'jsonwebtoken'
import { parse } from 'cookie-es'
import { Server as Engine } from 'engine.io'
import { Server } from 'socket.io'
import { defineEventHandler } from 'h3'
import { handleSocketRequest } from '@/server/socket/handleSocketRequest'
import type { NitroApp } from 'nitropack'
import type { Socket } from 'socket.io'

export interface KUNGalgameSocket extends Socket {
  payload?: KUNGalgameJWTPayload
}

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine()
  const io = new Server()

  io.bind(engine)

  io.use((socket: KUNGalgameSocket, next) => {
    const token = parse(socket.request.headers.cookie || '')
    const refreshToken = token['kungalgame-moemoe-refresh-token']

    try {
      const payload = jwt.verify(
        refreshToken,
        env.JWT_SECRET || ''
      ) as KUNGalgameJWTPayload
      socket.payload = payload
      next()
    } catch (error) {
      return error
    }
  })

  io.on('connection', handleSocketRequest)

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
