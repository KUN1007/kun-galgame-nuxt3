import { pageData } from '~/components/topic/pageData'
import type { TopicCard } from '~/types/api/topic'

export const useTopic = (topicType: 'resource' | 'all') => {
  const topics = useState<TopicCard[]>(topicType, () => [])

  const isLoadingComplete = useState('isLoadingComplete', () => false)
  const isFetching = useState('isFetching', () => false)
  const scrollPosition = useState('scrollPosition', () => 0)

  const getTopics = async () => {
    isFetching.value = true
    const result = await $fetch(
      topicType === 'resource' ? '/api/resource' : '/api/topic',
      {
        method: 'GET',
        query: pageData,
        ...kungalgameResponseHandler
      }
    )
    isFetching.value = false
    return result
  }

  const loadInitialTopics = async () => {
    if (topics.value.length === 0) {
      pageData.page = 1
      const initialTopics = await getTopics()
      topics.value = initialTopics
    }
  }

  const loadMoreTopics = async () => {
    if (isLoadingComplete.value || isFetching.value) {
      return
    }

    pageData.page++

    const newTopics = await getTopics()
    if (newTopics.length < pageData.limit) {
      isLoadingComplete.value = true
    }

    topics.value = [...topics.value, ...newTopics]
  }

  const resetTopics = async () => {
    pageData.page = 1
    isLoadingComplete.value = false
    topics.value = []
    scrollPosition.value = 0
    await loadInitialTopics()
  }

  watch(
    () => [pageData.sortField, pageData.sortOrder, pageData.category],
    async () => await resetTopics()
  )

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
