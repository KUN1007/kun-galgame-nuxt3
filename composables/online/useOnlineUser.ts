import type { Socket } from 'socket.io-client'
import type { OnlineUserCount } from '~/server/socket/socket'

let socket: Socket

export const useOnlineUser = () => {
  const { onlineCount } = storeToRefs(useTempSettingStore())

  const connect = () => {
    if (socket && socket.connected) {
      socket.emit('get:online:count')
      return
    }

    socket = useSocketIO()

    socket.on('connect', () => {
      socket.emit('get:online:count')
    })

    socket.on('update:online:count', (data: OnlineUserCount) => {
      onlineCount.value = data
    })

    socket.on('disconnect', () => {
      onlineCount.value = { total: 0, user: 0, guest: 0 }
    })
  }

  const disconnect = () => {
    if (socket) {
      socket.disconnect()
    }
  }

  const userDidLogin = (userId: string) => {
    if (socket && socket.connected && userId) {
      socket.emit('login', userId)
      socket.emit('get:online:count')
    }
  }

  const userDidLogout = () => {
    if (socket && socket.connected) {
      socket.emit('logout')
      socket.emit('get:online:count')
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    // disconnect()
  })

  return {
    onlineCount,
    userDidLogin,
    userDidLogout
  }
}
