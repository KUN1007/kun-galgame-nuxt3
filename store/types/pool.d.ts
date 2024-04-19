import type { PoolTopic } from '~/types/api/pool'

export interface PoolStoreTemp {
  savedPosition: number

  topics: PoolTopic[]
}
