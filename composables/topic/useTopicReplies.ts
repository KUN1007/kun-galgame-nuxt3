import type { TopicReply } from '~/types/api/topic-reply'
import type { Ref } from 'vue'

export const useTopicReplies = (topicId: number | Ref<number>) => {
  const _topicId = toValue(topicId)

  const replies = useState<TopicReply[]>(
    `kun-topic-replies-${_topicId}`,
    () => []
  )
  const isComplete = useState<boolean>(
    `kun-topic-replies-complete-${_topicId}`,
    () => false
  )

  const status = useState<'idle' | 'pending' | 'success' | 'error'>(
    `kun-topic-replies-status-${_topicId}`,
    () => 'idle'
  )

  const page = ref(1)
  const sortOrder = ref<'asc' | 'desc'>('asc')

  const _fetchReplies = async (
    fetchPage: number,
    fetchSortOrder: 'asc' | 'desc'
  ) => {
    status.value = 'pending'

    const newReplies = await $fetch(`/api/topic/${_topicId}/reply`, {
      query: {
        topicId: _topicId,
        page: fetchPage,
        limit: 30,
        sortOrder: fetchSortOrder
      },
      ...kungalgameResponseHandler
    })
    status.value = 'success'
    return newReplies
  }

  const loadInitialReplies = async () => {
    if (replies.value.length > 0) {
      return
    }

    page.value = 1
    sortOrder.value = 'asc'
    const initialData = await _fetchReplies(page.value, sortOrder.value)

    if (initialData.length < 30) {
      isComplete.value = true
    }
    replies.value = initialData
  }

  const loadMore = async () => {
    if (status.value === 'pending' || isComplete.value) return

    page.value++
    const newReplies = await _fetchReplies(page.value, sortOrder.value)
    if (newReplies.length < 30) {
      isComplete.value = true
    }

    replies.value.push(...newReplies)
  }

  const setSort = async (order: 'asc' | 'desc') => {
    if (status.value === 'pending' || sortOrder.value === order) return

    sortOrder.value = order
    page.value = 1
    isComplete.value = false

    const sortedReplies = await _fetchReplies(page.value, sortOrder.value)
    if (sortedReplies.length < 30) {
      isComplete.value = true
    }
    replies.value = sortedReplies
  }

  const addNewReply = (newReply: TopicReply) => {
    if (replies.value.some((r) => r.id === newReply.id)) return

    if (sortOrder.value === 'desc' && page.value === 1) {
      replies.value.unshift(newReply)
    } else {
      replies.value.push(newReply)
    }
  }

  const updateReply = (updatedReply: TopicReply) => {
    const index = replies.value.findIndex((r) => r.id === updatedReply.id)
    if (index !== -1) {
      replies.value[index] = updatedReply
    }
  }

  const removeReply = (replyId: number) => {
    const index = replies.value.findIndex((r) => r.id === replyId)
    if (index !== -1) {
      replies.value.splice(index, 1)
    }
  }

  return {
    replies,
    status,
    isComplete,
    sortOrder,
    loadInitialReplies,
    loadMore,
    setSort,
    addNewReply,
    updateReply,
    removeReply
  }
}
