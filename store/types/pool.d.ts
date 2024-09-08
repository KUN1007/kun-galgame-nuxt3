import type { PoolTopic } from '~/types/api/pool'

interface PageData {
  page: number
  limit: number
  sortField: string
  sortOrder: string
}

export interface PoolStoreTemp {
  savedPosition: number
  pageData: PageData

  topics: PoolTopic[]
}
