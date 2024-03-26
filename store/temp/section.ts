import type { GetSectionRequestData } from '~/types/api/section'

interface SectionStore {
  topic: GetSectionRequestData
}

export const useTempSectionStore = defineStore({
  id: 'tempSection',
  persist: false,
  state: (): SectionStore => ({
    topic: {
      section: '',
      page: '1',
      limit: '10',
      order: 'asc'
    }
  }),
  getters: {},
  actions: {}
})
