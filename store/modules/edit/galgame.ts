import type { GalgameStorePersist } from '~/store/types/edit/galgame'

export const usePersistEditGalgameStore = defineStore('KUNGalgameEditGalgame', {
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
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
    contentLimit: 'sfw',
    aliases: []
  }),
  actions: {}
})
