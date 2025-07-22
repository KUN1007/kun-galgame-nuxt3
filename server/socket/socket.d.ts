import type { KUNGalgamePayload } from '~/types/utils/jwt'
import type { Socket } from 'socket.io'

export interface KUNGalgameSocket extends Socket {
  payload?: KUNGalgamePayload
}

export interface OnlineUserCount {
  total: number
  user: number
  guest: number
}
