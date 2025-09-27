export interface EditStorePersist {
  mode: 'preview' | 'code'

  title: string
  content: string
  tags: string[]
  category: string
  section: string[]
  isNSFW: boolean
}

export interface EditStoreTemp {
  id: number
  title: string
  content: string
  tags: string[]
  category: string
  section: string[]
  isNSFW: boolean

  isTopicRewriting: boolean
}
