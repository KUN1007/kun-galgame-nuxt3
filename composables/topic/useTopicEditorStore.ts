import type { TopicCategoryKey } from '~/constants/topic'

export const useTopicEditorStore = () => {
  const tempStore = useTempEditStore()
  const persistStore = usePersistEditTopicStore()

  const activeStore = computed(() =>
    tempStore.isTopicRewriting ? tempStore : persistStore
  )

  const category = computed<TopicCategoryKey | ''>({
    get: () => activeStore.value.category as TopicCategoryKey | '',
    set: (value) => {
      activeStore.value.category = value
    }
  })

  const section = computed<string[]>({
    get: () => activeStore.value.section,
    set: (value) => {
      activeStore.value.section = value
    }
  })

  const tags = computed<string[]>({
    get: () => activeStore.value.tags,
    set: (value) => {
      activeStore.value.tags = value
    }
  })

  const title = computed<string>({
    get: () => activeStore.value.title,
    set: (value) => {
      activeStore.value.title = value
    }
  })

  const content = computed<string>({
    get: () => activeStore.value.content,
    set: (value) => {
      activeStore.value.content = value
    }
  })

  const isNSFW = computed<boolean>({
    get: () => activeStore.value.isNSFW,
    set: (value) => {
      activeStore.value.isNSFW = value
    }
  })

  return {
    category,
    section,
    tags,
    title,
    content,
    isNSFW
  }
}
