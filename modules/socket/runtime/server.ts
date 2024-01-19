import { eventHandler } from 'h3'
import { Server as SocketServer } from 'socket.io'
import type { Server } from 'http'
import type { ServerOptions } from 'socket.io'

declare global {
  var __io: SocketServer
}

export function createIOHandler<
  T extends Record<string, (io: SocketServer) => void>,
>(functions: T, serverOptions: Partial<ServerOptions>) {
  return eventHandler((event) => {
    if (!globalThis.__io && process.env.NODE_ENV === 'production') {
      const httpServer = (event.node.req.socket as any).server as Server
      const io = new SocketServer(httpServer, serverOptions)

      Object.keys(functions).forEach((fn) => {
        functions[fn](io)
      })

      globalThis.__io = io
    }
  })
}
