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
      'zh-cn': '',
      'zh-tw': ''
    },
    introduction: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': '',
      'zh-tw': ''
    },
    aliases: []
  }),
  actions: {
    resetGalgameData() {
      this.vndbId = ''
      this.name = {
        'en-us': '',
        'ja-jp': '',
        'zh-cn': '',
        'zh-tw': ''
      }
      this.introduction = {
        'en-us': '',
        'ja-jp': '',
        'zh-cn': '',
        'zh-tw': ''
      }
      this.aliases = []
    }
  }
})
