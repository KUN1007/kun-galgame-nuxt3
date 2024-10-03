<script setup lang="ts">
import type { Message } from '~/types/api/chat-message'

definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()
const socket = useSocketIO()
const { locale } = useI18n()

const messageInput = ref('')
const messages = ref<Message[]>([])
const uid = parseInt((route.params as { uid: string }).uid)
const pageData = reactive({
  page: 1,
  limit: 30
})

const sendMessage = async () => {
  const newMessage = await $fetch(`/api/message/chat/private`, {
    method: 'POST',
    query: { receiverUid: uid },
    body: { content: messageInput.value },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (typeof newMessage !== 'string') {
    messages.value.push(newMessage)
    socket.emit('sendingMessage', newMessage)
    messageInput.value = ''
  }
}

const getMessageHistory = async () => {
  const histories = await $fetch(`/api/message/chat/history`, {
    method: 'GET',
    query: { receiverUid: uid, ...pageData },
    watch: false,
    ...kungalgameResponseHandler
  })
  return Array.isArray(histories) ? histories : []
}

onMounted(async () => {
  messages.value = await getMessageHistory()

  socket.emit('register')

  socket.on('sentMessage', (msg: Message) => {
    messages.value.push(msg)
  })
})
</script>

<template>
  <div class="container">
    <MessagePmHeader :uid="uid" />

    <div class="history">
      <template v-if="messages.length">
        <div class="item" v-for="(message, index) in messages" :key="index">
          <KunAvatar :user="message.sender" size="30px" />

          <div class="content-container">
            <div class="top">{{ message.sender.name }}</div>
            <div class="content">{{ message.content }}</div>
            <div class="footer">
              <span class="time">
                {{ formatTimeDifference(message.time, locale as Language) }}
              </span>
              <span class="read">
                {{ message.readBy }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <KunNull :condition="!messages.length" type="null" />
    </div>

    <input v-model="messageInput" placeholder="Input message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
