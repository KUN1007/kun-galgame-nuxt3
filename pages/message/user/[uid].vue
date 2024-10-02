<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()
const socket = useSocketIO()

const uid = computed(() => {
  return parseInt((route.params as { uid: string }).uid)
})

const message = ref('')
const chatRoomId = ref(0)

const sendMessage = async () => {
  if (!chatRoomId.value) {
    return
  }

  const newMessage = await $fetch(`/api/message/chat/private`, {
    method: 'POST',
    query: { crid: chatRoomId.value, receiverUid: uid.value },
    body: { content: message.value },
    watch: false,
    ...kungalgameResponseHandler
  })

  socket.emit('sendingMessage', { message: newMessage, uid: uid.value })

  message.value = ''
}

onMounted(async () => {
  const res = await $fetch(`/api/message/chat/online`, {
    method: 'POST',
    query: { receiverUid: uid.value },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (typeof res === 'number') {
    chatRoomId.value = res
  }

  socket.emit('register')

  socket.on('sentMessage', (msg) => {
    console.log(msg)
  })
})
</script>

<template>
  <div>
    <input v-model="message" placeholder="Input message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style lang="scss" scoped></style>
