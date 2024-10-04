<script setup lang="ts">
import { replaceAsideItem } from '../aside/asideItemStore'
import type { Message } from '~/types/api/chat-message'

const props = defineProps<{
  uid: number
}>()

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
const currentUserUid = usePersistUserStore().uid
const uid = props.uid
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
    replaceAsideItem(newMessage)
    socket.emit('message:sending', newMessage)
    messageInput.value = ''
  }

  nextTick(() => scrollToBottom())
}

const readMessageArray = (messages: Message[]) => {
  const cmidArray = messages
    .filter(
      (message) => !message.readBy.some((read) => read.uid === currentUserUid)
    )
    .map((message) => message.cmid)

  if (!cmidArray.length) {
    return
  }

  socket.emit('message:read', uid, cmidArray)
}

const setupObserver = () => {
  if (!historyContainer.value) {
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && messages.value.length) {
        readMessageArray(messages.value)
      }
    })
  })

  const messageElements = historyContainer.value.querySelectorAll('.item')
  messageElements.forEach((el) => observer.observe(el))
}

const getMessageHistory = async () => {
  const histories = await $fetch(`/api/message/chat/history`, {
    method: 'GET',
    query: { receiverUid: uid, ...pageData },
    watch: false,
    ...kungalgameResponseHandler
  })
  const results = Array.isArray(histories) ? histories : []
  readMessageArray(results)
  return results
}

watch(
  () => messages.value,
  () => scrollToBottom()
)

onMounted(async () => {
  socket.emit('private:join', uid)

  socket.on('message:received', (msg: Message) => {
    messages.value.push(msg)
    replaceAsideItem(msg)
    readMessageArray([msg])
    nextTick(() => scrollToBottom())
  })

  socket.on('message:read:update', (cmidArray: number[]) => {
    messages.value
      .filter((message) => cmidArray.includes(message.cmid))
      .forEach((message) => {
        if (message.receiverUid !== currentUserUid) {
          message.readBy.push({ uid: currentUserUid, read_time: Date.now() })
        }
      })
  })

  messages.value = await getMessageHistory()

  window.addEventListener('keydown', onKeydown)

  nextTick(() => {
    scrollToBottom()
    setupObserver()
  })
})

const onKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    await sendMessage()
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
        class="message-item"
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
