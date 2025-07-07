export interface CategoryTopic {
  id: number
  title: string
  time: number
}

export interface CategoryResponseData {
  section: string
  topic: CategoryTopic
  topics: number
  views: number
}
