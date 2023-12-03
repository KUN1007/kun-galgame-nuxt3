interface HomeSearchTemp {
  keywords: string
  category: string[]
  page: number
  limit: number
  sortField: string
  sortOrder: string

  // Whether to continue loading after it's done
  isLoading: boolean
}

export interface HomeTopicTemp {
  category: string[]
  page: number
  limit: number
  sortField: string
  sortOrder: string

  // Whether to continue loading after it's done
  isLoading: boolean
}

export interface HomeStoreTemp {
  search: HomeSearchTemp
  topic: HomeTopicTemp

  isShowSearch: boolean
}

export interface HomeStorePersist {
  // Other stores
  // Whether to activate the left interactive panel of the main page
  isActiveMainPageAside: boolean

  // Storage for search history
  searchHistory: string[]
}
