import { defineStore } from 'pinia'
import { TopicStorePersist } from '@/store/types/topic/topic'

export const usePersistKUNGalgameTopicStore = defineStore({
  id: 'KUNGalgameTopic',
  persist: true,
  state: (): TopicStorePersist => ({
    // Whether to show advanced editing mode
    isShowAdvance: false,
    // Whether to activate the left interaction panel
    isActiveAside: false,
  }),
})
