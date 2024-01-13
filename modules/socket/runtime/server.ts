import type { Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import { eventHandler } from 'h3'
import type { ServerOptions } from 'socket.io'

declare global {
  var io: SocketServer
}

export function createIOHandler<
  T extends Record<string, (io: SocketServer) => void>,
>(functions: T, serverOptions: Partial<ServerOptions>) {
  return eventHandler((event) => {
    if (!globalThis.io) {
      const httpServer = (event.node.req.socket as any).server as Server
      const io = new SocketServer(httpServer, serverOptions)

      Object.keys(functions).forEach((fn) => {
        functions[fn](io)
      })

      globalThis.io = io
    }
  })
}
