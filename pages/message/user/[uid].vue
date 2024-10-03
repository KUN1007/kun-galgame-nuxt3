<script setup lang="ts">
import type { Message } from '~/types/api/chat-message'

definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()
const socket = useSocketIO()

const historyContainer = ref<HTMLDivElement | null>(null)
const messageInput = ref('')
const messages = ref<Message[]>([])
const isLoadHistoryMessageComplete = ref(false)
const isShowLoader = computed(() => {
  if (isLoadHistoryMessageComplete.value) {
    return false
  }
  if (messages.value.length < 30) {
    return false
  }
  return true
})
const uid = parseInt((route.params as { uid: string }).uid)
const pageData = reactive({
  page: 1,
  limit: 30
})

const scrollToBottom = () => {
  if (historyContainer.value) {
    historyContainer.value.scrollTop = historyContainer.value.scrollHeight
  }
}

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

  nextTick(() => scrollToBottom())
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

watch(
  () => messages.value,
  () => scrollToBottom()
)

onMounted(async () => {
  messages.value = await getMessageHistory()

  socket.emit('register')

  socket.on('receivedMessage', (msg: Message) => {
    messages.value.push(msg)
    nextTick(() => scrollToBottom())
  })

  window.addEventListener('keydown', onKeydown)

  nextTick(() => scrollToBottom())
})

const onKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    await sendMessage()
  }
}

onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const handleLoadHistoryMessages = async () => {
  if (!historyContainer.value) {
    return
  }

  const previousScrollHeight = historyContainer.value.scrollHeight
  const previousScrollTop = historyContainer.value.scrollTop

  pageData.page += 1
  const histories = await getMessageHistory()

  if (histories.length > 0) {
    messages.value.unshift(...histories)

    nextTick(() => {
      if (historyContainer.value) {
        const newScrollHeight = historyContainer.value.scrollHeight
        historyContainer.value.scrollTop =
          previousScrollTop + (newScrollHeight - previousScrollHeight)
      }
    })
  } else {
    isLoadHistoryMessageComplete.value = true
  }
}
</script>

<template>
  <MessagePmHeader :uid="uid" />

  <div ref="historyContainer" class="history">
    <div class="loader" v-if="isShowLoader" @click="handleLoadHistoryMessages">
      {{ $t('message.history') }}
    </div>

    <KunNull :condition="!isShowLoader && messages.length > 30" type="null" />

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
  margin-bottom: 24px;

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

.history {
  overflow-y: scroll;
  scroll-behavior: auto;
  padding-bottom: 16px;

  .loader {
    margin: 16px 0;
    color: var(--kungalgame-font-color-0);
    cursor: pointer;
    @include kun-center;

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }
}
</style>
