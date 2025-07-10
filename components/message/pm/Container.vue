<script setup lang="ts">
import { replaceAsideItem } from '../aside/asideItemStore'
import type { ChatMessage } from '~/types/api/chat-message'

const props = defineProps<{
  userId: number
}>()

const socket = useSocketIO()
useSocketIOErrorHandler()

const historyContainer = ref<HTMLDivElement | null>(null)
const messageInput = ref('')
const messages = ref<ChatMessage[]>([])
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
const currentUserUid = usePersistUserStore().id
const uid = props.userId
const pageData = reactive({
  page: 1,
  limit: 30
})

const scrollToBottom = () => {
  if (historyContainer.value) {
    historyContainer.value.scrollTo({
      top: historyContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const sendMessage = () => {
  if (!messageInput.value.trim()) {
    useMessage(10401, 'warn')
    return
  }
  if (messageInput.value.length > 1007) {
    useMessage(10402, 'warn')
    return
  }
  socket.emit('message:sending', uid, messageInput.value)
}

const getMessageHistory = async () => {
  const histories = await $fetch(`/api/message/chat/history`, {
    method: 'GET',
    query: { receiverUid: uid, ...pageData },
    watch: false,
    ...kungalgameResponseHandler
  })
  const results = Array.isArray(histories) ? histories : []
  return results
}

watch(
  () => messages.value,
  () => scrollToBottom()
)

onMounted(async () => {
  socket.emit('private:join', uid)

  socket.on('message:sent', (newMessage: ChatMessage) => {
    messages.value.push(newMessage)
    replaceAsideItem(newMessage)
    messageInput.value = ''
    nextTick(() => scrollToBottom())
  })

  socket.on('message:received', (msg: ChatMessage) => {
    if (msg.receiverUid === currentUserUid && msg.sender.id === uid) {
      messages.value.push(msg)
      replaceAsideItem(msg)
      nextTick(() => {
        scrollToBottom()
      })
    }
  })

  messages.value = await getMessageHistory()
  window.addEventListener('keydown', onKeydown)

  nextTick(() => {
    scrollToBottom()
  })
})

const onKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    sendMessage()
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  socket.emit('private:leave')
})

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
        historyContainer.value.scrollTo({
          top: previousScrollTop + (newScrollHeight - previousScrollHeight)
        })
      }
    })
  } else {
    isLoadHistoryMessageComplete.value = true
  }
}
</script>

<template>
  <div
    ref="historyContainer"
    class="h-[calc(100dvh-14rem)] overflow-y-auto py-3"
  >
    <div class="flex justify-center">
      <KunButton
        variant="light"
        v-if="isShowLoader"
        @click="handleLoadHistoryMessages"
      >
        加载历史消息
      </KunButton>
    </div>

    <KunNull v-if="!isShowLoader && messages.length > 30" />

    <div class="space-y-2" v-if="messages.length">
      <MessagePmItem
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        :is-sent="uid !== message.sender.id"
      />
    </div>

    <KunNull v-if="!messages.length" />
  </div>

  <div class="flex justify-between gap-2">
    <KunInput size="lg" v-model="messageInput" />
    <KunButton
      size="xl"
      :is-icon-only="true"
      class-name="shrink-0"
      @click="sendMessage"
    >
      <KunIcon name="lucide:send" />
    </KunButton>
  </div>
</template>
