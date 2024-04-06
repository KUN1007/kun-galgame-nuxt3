import type { GalgameStorePersist } from '~/store/types/edit/galgame'

export const usePersistEditGalgameStore = defineStore({
  id: 'KUNGalgameEditGalgame',
  persist: {
    storage: persistedState.localStorage
  },
  state: (): GalgameStorePersist => ({
    vndbId: '',
    name: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': ''
    },
    introduction: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': ''
    }
  }),
  actions: {
    resetGalgameData() {
      this.vndbId = ''
      this.name = {
        'en-us': '',
        'ja-jp': '',
        'zh-cn': ''
      }
      this.introduction = {
        'en-us': '',
        'ja-jp': '',
        'zh-cn': ''
      }
    }
  }
})
