interface HomeSearchTemp {
  keywords: string
  type: 'topic' | 'galgame'
  page: number
  limit: number
  sortField: string
  sortOrder: string

  isLoading: boolean
}

export interface HomeStoreTemp {
  search: HomeSearchTemp

  isShowSearch: boolean
}

export interface HomeStorePersist {
  searchHistory: string[]

  fold: {
    updates: boolean
    topics: boolean
    galgames: boolean
    resources: boolean
  }
}
