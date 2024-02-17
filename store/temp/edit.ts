import type { EditStoreTemp } from '~/store/types/edit'

export const useTempEditStore = defineStore({
  id: 'tempEdit',
  persist: false,
  state: (): EditStoreTemp => ({
    tid: 0,
    title: '',
    content: '',
    tags: [],
    category: [],

    textCount: 0,
    isTopicRewriting: false,

    autosaveCount: 0,
    clearTopic: false,
  }),
  actions: {
    resetRewriteTopicData() {
      this.textCount = 0
      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []

      this.isTopicRewriting = false

      this.autosaveCount = 0
    },
  },
})
