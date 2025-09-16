import type { EditStorePersist } from '~/store/types/edit/topic'

export const usePersistEditTopicStore = defineStore('KUNGalgameEditTopic', {
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  },
  state: (): EditStorePersist => ({
    mode: 'preview',
    title: '',
    content: '',
    tags: [],
    category: '',
    section: [],
    isNSFW: false
  }),
  getters: {},
  actions: {
    resetTopicData() {
      this.title = ''
      this.content = ''
      this.tags = []
      this.category = ''
      this.section = []
      this.isNSFW = false
    }
  }
})
