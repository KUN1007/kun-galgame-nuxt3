import type { Ctx } from '@milkdown/ctx'
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

    textCount: 0,
    isTopicRewriting: false,

    autosaveCount: 0,

    editorContext: shallowRef<Ctx | null>(null)
  }),
  actions: {
    resetRewriteTopicData() {
      this.tid = 0
      this.title = ''
      this.content = ''
      this.tags = []
      this.category = []
      this.section = []

      this.textCount = 0
      this.isTopicRewriting = false

      this.autosaveCount = 0
    }
  }
})
