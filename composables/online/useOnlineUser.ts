import type { OnlineUserCount } from '~/server/socket/socket'

export const useOnlineUser = () => {
  const { onlineCount } = storeToRefs(useTempSettingStore())

  const socket = useSocketIO()

  const handleUpdateCount = (data: OnlineUserCount) => {
    onlineCount.value = data
  }

  const handleDisconnect = () => {
    onlineCount.value = { total: 0, user: 0, guest: 0 }
  }

  onMounted(() => {
    if (!socket.connected) {
      socket.connect()
    }

    socket.on('update:online:count', handleUpdateCount)

    socket.on('disconnect', handleDisconnect)
  })

  onUnmounted(() => {
    socket.off('update:online:count', handleUpdateCount)
    socket.off('disconnect', handleDisconnect)
  })

  const userDidLogin = (userId: string) => {
    if (socket.connected && userId) {
      socket.emit('login', userId)
    }
  }

  const userDidLogout = () => {
    if (socket.connected) {
      socket.emit('logout')
    }
  }

  return {
    onlineCount,
    userDidLogin,
    userDidLogout
  }
}
