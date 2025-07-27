import type { OnlineUserCount } from '~/server/socket/socket'

export const useOnlineUser = () => {
  const { onlineCount } = storeToRefs(useTempSettingStore())

  const socket = useSocketIO()

  onMounted(() => {
    socket.emit('get:online:count')

    socket.on('update:online:count', (data: OnlineUserCount) => {
      onlineCount.value = data
    })
  })

  return { onlineCount }
}
