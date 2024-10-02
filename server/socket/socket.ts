import type { Server } from 'socket.io'

const socketServer: { io?: Server } = { io: undefined }

export default socketServer
