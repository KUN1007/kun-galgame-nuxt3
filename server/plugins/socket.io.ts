import type { NitroApp } from 'nitropack'
import { Server as Engine } from 'engine.io'
import { Server } from 'socket.io'
import { defineEventHandler } from 'h3'

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine()
  const io = new Server()

  io.bind(engine)

  io.on('connection', (socket) => {
    // const context = socket.request.context
  })

  nitroApp.router.use(
    '/socket.io/',
    defineEventHandler({
      handler(event) {
        // event.node.req.context = event.context
        // @ts-expect-error private method
        engine.handleRequest(event.node.req, event.node.res)
        event._handled = true
      },
      websocket: {
        open(peer) {
          const nodeContext = peer.ctx.node
          const req = nodeContext.req

          // @ts-expect-error private method
          engine.prepare(req)

          const rawSocket = nodeContext.req.socket
          const websocket = nodeContext.ws

          // @ts-expect-error private method
          engine.onWebSocket(req, rawSocket, websocket)
        }
      }
    })
  )
})
