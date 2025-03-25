import type { TopicCard } from '@/types/api/topic'

export interface PageData {
  page: number
  limit: number
  sortField: 'created' | 'views'
  sortOrder: 'asc' | 'desc'
  category: 'all' | 'galgame' | 'technique' | 'others'
}

export const pageData = reactive<PageData>({
  page: 1,
  limit: 24,
  sortField: 'created',
  sortOrder: 'desc',
  category: 'all'
})

export const useTopic = () => {
  const topics = useState<TopicCard[]>('topics', () => [])
  const isLoadingComplete = useState('isLoadingComplete', () => false)
  const isFetching = useState('isFetching', () => false)
  const page = useState('page', () => 1)
  const scrollPosition = useState('scrollPosition', () => 0)

  const getTopics = async () => {
    const result = await $fetch('/api/topic', {
      method: 'GET',
      query: {
        ...pageData,
        page: page.value
      }
    })
    return result
  }

  const loadInitialTopics = async () => {
    if (topics.value.length === 0) {
      page.value = 1
      const initialTopics = await getTopics()
      topics.value = initialTopics
    }
  }

  const loadMoreTopics = async () => {
    if (isLoadingComplete.value || isFetching.value) return

    isFetching.value = true
    page.value++

    try {
      const newTopics = await getTopics()

      if (newTopics.length < pageData.limit) {
        isLoadingComplete.value = true
      }

      topics.value = [...topics.value, ...newTopics]
    } finally {
      isFetching.value = false
    }
  }

  const resetTopics = async () => {
    page.value = 1
    isLoadingComplete.value = false
    topics.value = []
    scrollPosition.value = 0
    await loadInitialTopics()
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight
    scrollPosition.value = scrollTop

    const errorMargin = 500
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin) {
      loadMoreTopics()
    }
  }

  onMounted(() => {
    nextTick(() => {
      window.scrollTo({
        top: scrollPosition.value,
        behavior: 'instant'
      })
    })
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    topics,
    isLoadingComplete,
    isFetching,
    loadMoreTopics,
    resetTopics,
    loadInitialTopics
  }
}
