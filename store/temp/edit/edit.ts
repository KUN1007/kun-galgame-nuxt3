import type { EditStoreTemp } from '~/store/types/edit/topic'

export const useTempEditStore = defineStore('tempEdit', {
  persist: false,
  state: (): EditStoreTemp => ({
    tid: 0,
    title: '',
    content: '',
    tags: [],
    category: [],
    section: [],

    isTopicRewriting: false
  }),
  actions: {
    resetRewriteTopicData() {
      this.tid = 0
      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []
      this.section = []

      this.isTopicRewriting = false
    }
  }
})
