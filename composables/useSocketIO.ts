import { io, type Socket } from 'socket.io-client'

let socket: Socket | null = null

export const useSocketIO = () => {
  if (!socket) {
    socket = io()
  }

  return socket
}
