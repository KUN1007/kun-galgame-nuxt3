import type { HomeTopic, TypeToGet } from '~/types/api/home'

interface HomeSearchTemp {
  keywords: string
  category: string[]
  page: number
  limit: number
  sortField: string
  sortOrder: string

  isLoading: boolean
}

export interface HomeStoreTemp {
  search: HomeSearchTemp
  topics: HomeTopic[]

  savedPosition: number
  isShowSearch: boolean
}

export interface HomeStorePersist {
  isActiveHomeAside: boolean

  typeToGet: TypeToGet
  searchHistory: string[]
}
