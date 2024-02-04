import type { PoolTopic } from '~/types/api/pool'

export interface PoolStoreTemp {
  page: number
  limit: number
  sortField: string
  sortOrder: string

  isScrollToTop: boolean
  savedPosition: number

  topics: PoolTopic[]
}
