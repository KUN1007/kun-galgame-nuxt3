import type { Server } from 'socket.io'

export function defineIOHandler (cb: (io: Server) => void) {
  return cb
}
