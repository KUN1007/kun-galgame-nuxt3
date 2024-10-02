<script setup lang="ts">
import type { Message } from '~/types/api/chat-message'

definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const socket = useSocketIO()

const message = ref('')
const uid = parseInt((route.params as { uid: string }).uid)
const pageData = reactive({
  page: 1,
  limit: 30
})

const sendMessage = async () => {
  const newMessage = await $fetch(`/api/message/chat/private`, {
    method: 'POST',
    query: { receiverUid: uid },
    body: { content: message.value },
    watch: false,
    ...kungalgameResponseHandler
  })

  socket.emit('sendingMessage', newMessage)

  message.value = ''
}

const getMessageHistory = async () => {
  const histories = await $fetch(`/api/message/chat/history`, {
    method: 'GET',
    query: { receiverUid: uid, ...pageData },
    watch: false,
    ...kungalgameResponseHandler
  })
  return histories
}

onMounted(async () => {
  socket.emit('register')

  socket.on('sentMessage', (msg) => {
    alert(JSON.stringify(msg))
  })
})
</script>

<template>
  <div class="container">
    <header>
      <Icon @click="router.back()" class="icon" name="lucide:chevron-left" />
      <h2>{{ $t('message.notice') }}</h2>
    </header>

    <input v-model="message" placeholder="Input message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    cursor: pointer;
    font-size: 24px;
    margin-right: 10px;

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }

  h2 {
    &::before {
      content: '';
      margin: 0;
    }
  }
}

.container {
  width: 100%;
}
</style>
