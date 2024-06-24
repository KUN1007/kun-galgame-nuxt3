interface NonMoeLogStore {
  page: string
  limit: string
}

export const useTempNonMoeStore = defineStore({
  id: 'tempNonMoe',
  persist: false,
  state: (): NonMoeLogStore => ({
    page: '1',
    limit: '4'
  }),
  getters: {},
  actions: {}
})
