import type { PoolTopic } from '~/types/api/pool'

export interface PoolStoreTemp {
  savedPosition: number
  page: number

  topics: PoolTopic[]
}
