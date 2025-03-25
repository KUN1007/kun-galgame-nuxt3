export const useSocketIOErrorHandler = () => {
  const socket = useSocketIO()

  onMounted(() => {
    socket.on('socket:error:1', () => useMessage(10148, 'error'))
    socket.on('socket:error:2', () => useMessage(10149, 'error'))
    socket.on('socket:error:3', () => useMessage(10150, 'error'))
    socket.on('socket:error:4', () => useMessage(10151, 'error'))
  })
}
