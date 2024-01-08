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

  isLoading: boolean
}

export interface HomeStoreTemp {
  search: HomeSearchTemp
  topic: HomeTopicTemp

  isShowSearch: boolean
}

export interface HomeStorePersist {
  isActiveMainPageAside: boolean

  searchHistory: string[]
}
