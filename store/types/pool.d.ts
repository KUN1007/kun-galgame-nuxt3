import type { PoolTopic } from '~/types/api/pool'

interface PageData {
  page: number
  limit: number
  sortField: 'created' | 'views'
  sortOrder: 'asc' | 'desc'
  category: 'all' | 'galgame' | 'technique' | 'others'
}

export interface PoolStoreTemp {
  savedPosition: number
  pageData: PageData

  topics: PoolTopic[]
}

export interface PoolStorePersist {
  layout: 'grid' | 'list'
}
