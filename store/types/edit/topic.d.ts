export interface EditStorePersist {
  mode: 'preview' | 'code'

  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]
}

export interface EditStoreTemp {
  id: number
  title: string
  content: string
  tags: string[]
  category: string
  section: string[]

  isTopicRewriting: boolean
}
