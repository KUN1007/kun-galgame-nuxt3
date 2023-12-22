import type { TopicStorePersist } from '~/store/types/topic/topic'

export const usePersistKUNGalgameTopicStore = defineStore({
  id: 'KUNGalgameTopic',
  persist: true,
  state: (): TopicStorePersist => ({
    isShowAdvance: false,
    isActiveAside: false,
  }),
})
