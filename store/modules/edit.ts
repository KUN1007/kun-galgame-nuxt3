import type { EditStorePersist } from '../types/edit'

export const useKUNGalgameEditStore = defineStore({
  id: 'KUNGalgameEdit',
  persist: true,
  state: (): EditStorePersist => ({
    textCount: 0,

    title: '',
    content: '',
    tags: [],
    category: [],
    section: []
  }),
  getters: {},
  actions: {
    resetTopicData() {
      this.textCount = 0

      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []
      this.section = []
    }
  }
})
