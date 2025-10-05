export const usePersistEditGalgameRatingStore = defineStore(
  'KUNGalgameEditGalgameRating',
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage()
    },
    state: () => ({
      shortSummary: ''
    }),
    actions: {}
  }
)
