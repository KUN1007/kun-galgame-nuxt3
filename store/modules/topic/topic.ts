import type { TopicStorePersist } from '~/store/types/topic/topic'

export const usePersistKUNGalgameTopicStore = defineStore('KUNGalgameTopic', {
  persist: true,
  state: (): TopicStorePersist => ({
    layout: 'grid'
  })
})
