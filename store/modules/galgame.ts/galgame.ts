import type { GalgameStorePersist } from '~/store/types/galgame/galgame'

export const usePersistGalgameStore = defineStore({
  id: 'Galgame',
  persist: true,
  state: (): GalgameStorePersist => ({
    vndb_id: 0,
    name: {
      en_us: '',
      ja_jp: '',
      zh_cn: ''
    },
    banner: '',
    introduction: {
      en_us: '',
      ja_jp: '',
      zh_cn: ''
    },
    platform: [],

    official: ''
  }),
  actions: {}
})
