import type { AsideItem, Message } from '@/types/api/chat-message'

export const asideItems = ref<AsideItem[]>([])

export const replaceAsideItem = (message: Message) => {
  const targetIndex = asideItems.value.findIndex(
    (item) => item.chatroomName === message.chatroomName
  )

  if (targetIndex !== -1) {
    asideItems.value[targetIndex].content = message.content
    asideItems.value[targetIndex].time = message.time
    asideItems.value[targetIndex].count++
  }

  asideItems.value.sort((a, b) => b.time - a.time)
}
