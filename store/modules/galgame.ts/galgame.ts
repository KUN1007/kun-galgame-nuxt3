import type { GalgameStorePersist } from '~/store/types/galgame/galgame'

export const usePersistGalgameStore = defineStore({
  id: 'Galgame',
  persist: true,
  state: (): GalgameStorePersist => ({
    vndb_id: '',
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
    platform: ['windows'],

    official: ''
  }),
  actions: {}
})
