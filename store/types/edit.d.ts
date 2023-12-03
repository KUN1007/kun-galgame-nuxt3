export interface EditStorePersist {
  editorHeight: number
  textCount: number

  title: string
  content: string
  tags: Array<string>
  category: Array<string>

  // Whether to display hot keywords
  isShowHotKeywords: boolean
  // Whether to save the topic
  isSaveTopic: boolean
}

export interface EditStoreTemp {
  tid: number
  title: string
  content: string
  tags: Array<string>
  category: Array<string>

  textCount: number
  // Whether the topic is being rewritten
  isTopicRewriting: boolean
}
