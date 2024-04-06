import type { EditStorePersist } from '~/store/types/edit/topic'

export const usePersistEditTopicStore = defineStore({
  id: 'KUNGalgameEditTopic',
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
