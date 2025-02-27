interface SectionStore {
  page: number
  limit: number
}

export const useTempSectionStore = defineStore('tempSection', {
  persist: false,
  state: (): SectionStore => ({
    page: 1,
    limit: 10
  }),
  getters: {},
  actions: {}
})
