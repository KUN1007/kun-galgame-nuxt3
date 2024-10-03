<script setup lang="ts">
import type { Message } from '~/types/api/chat-message'

definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()
const socket = useSocketIO()

const messageInput = ref('')
const messages = ref<Message[]>([])
const uid = parseInt((route.params as { uid: string }).uid)
const pageData = reactive({
  page: 1,
  limit: 30
})

const sendMessage = async () => {
  if (!messageInput.value.trim()) {
    return
  }

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

  window.addEventListener('keydown', onKeydown)
})

const onKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    await sendMessage()
  }
}

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <MessagePmHeader :uid="uid" />

  <div class="history">
    <template v-if="messages.length">
      <MessagePmItem
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        :is-sent="uid !== message.sender.uid"
      />
    </template>

    <KunNull :condition="!messages.length" type="null" />
  </div>

  <div class="send-container">
    <KunInput v-model="messageInput" />
    <KunButton @click="sendMessage">
      <Icon class="icon" name="lucide:send" />
    </KunButton>
  </div>
</template>

<style lang="scss" scoped>
.send-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 24px 0;

  .kun-input {
    width: 100%;
    margin-right: 10px;
    border: 1.5px solid var(--kungalgame-blue-5);
  }

  .icon {
    font-size: 24px;
    @include kun-center;
  }
}
</style>
