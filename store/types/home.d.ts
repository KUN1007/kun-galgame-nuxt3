import type { HomeTopic } from '~/types/api/home'

interface HomeSearchTemp {
  keywords: string
  category: string[]
  page: number
  limit: number
  sortField: string
  sortOrder: string

  isLoading: boolean
}

export interface HomeTopicTemp {
  category: string[]
  page: number
  limit: number
  sortField: string
  sortOrder: string
}

export interface HomeStoreTemp {
  search: HomeSearchTemp
  topic: HomeTopicTemp

  topics: HomeTopic[]

  isShowSearch: boolean
}

export interface HomeStorePersist {
  isActiveMainPageAside: boolean

  searchHistory: string[]
}
