import { defineStore } from 'pinia'
import type { PoolStorePersist } from '~/store/types/pool'

export const usePersistPoolStore = defineStore({
  id: 'KUNGalgamePool',
  persist: true,
  state: (): PoolStorePersist => ({
    layout: 'grid'
  })
})
