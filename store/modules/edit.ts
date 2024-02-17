import type { EditStorePersist } from '../types/edit'

export const useKUNGalgameEditStore = defineStore({
  id: 'KUNGalgameEdit',
  persist: true,
  state: (): EditStorePersist => ({
    editorHeight: 300,
    textCount: 0,

    title: '',
    content: '',
    tags: [],
    category: [],
    isShowHotKeywords: false,
  }),
  getters: {},
  actions: {
    resetTopicData() {
      this.textCount = 0

      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []
    },
  },
})
