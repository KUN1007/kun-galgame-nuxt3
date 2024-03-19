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
    section: [],

    textCount: 0,
    isTopicRewriting: false,

    autosaveCount: 0
  }),
  actions: {
    resetRewriteTopicData() {
      this.textCount = 0
      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []
      this.section = []

      this.isTopicRewriting = false

      this.autosaveCount = 0
    }
  }
})
