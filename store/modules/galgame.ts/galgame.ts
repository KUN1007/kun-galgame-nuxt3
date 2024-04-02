import type { GalgameStorePersist } from '~/store/types/galgame/galgame'

export const usePersistGalgameStore = defineStore({
  id: 'Galgame',
  persist: true,
  state: (): GalgameStorePersist => ({
    vndb_id: 0,
    name: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': ''
    },
    banner: '',
    introduction: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': ''
    },
    platform: [],

    official: ''
  }),
  actions: {}
})
