export interface EditStorePersist {
  editorHeight: number
  textCount: number

  title: string
  content: string
  tags: Array<string>
  category: Array<string>

  isShowHotKeywords: boolean
}

export interface EditStoreTemp {
  tid: number
  title: string
  content: string
  tags: Array<string>
  category: Array<string>

  textCount: number
  isTopicRewriting: boolean

  autosaveCount: number
  clearTopic: boolean
}
