export interface EditStorePersist {
  editorHeight: number
  textCount: number

  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]

  isShowHotKeywords: boolean
}

export interface EditStoreTemp {
  tid: number
  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]

  textCount: number
  isTopicRewriting: boolean

  autosaveCount: number
}
