import type { EditStoreTemp } from '~/store/types/edit/topic'

export const useTempEditStore = defineStore('tempEdit', {
  persist: false,
  state: (): EditStoreTemp => ({
    id: 0,
    title: '',
    content: '',
    tags: [],
    category: '',
    section: [],
    isNSFW: false,

    isTopicRewriting: false
  }),
  actions: {
    resetRewriteTopicData() {
      this.id = 0
      this.title = ''
      this.content = ''
      this.tags = []
      this.category = ''
      this.section = []
      this.isNSFW = false

      this.isTopicRewriting = false
    }
  }
})
