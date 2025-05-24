import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

interface Store {
  resources: GalgameResourceStoreTemp[]
  isShowPublish: boolean
  rewriteResourceId: number
  commentToUid: number
}

export const useTempGalgameResourceStore = defineStore('tempGalgameResource', {
  persist: false,
  state: (): Store => ({
    resources: [],
    isShowPublish: false,
    rewriteResourceId: 0,

    commentToUid: 0
  }),
  actions: {}
})
