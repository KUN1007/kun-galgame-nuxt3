export interface SearchResult {
  tid: number
  title: string
  content: string
}

export interface SearchRequestData {
  keywords: string
  type: 'topic' | 'galgame'
  page: string
  limit: string
}
