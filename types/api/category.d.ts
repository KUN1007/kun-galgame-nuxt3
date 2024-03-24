export interface CategoryUser {
  name: string
  uid: string
}

export interface CategoryTopic {
  title: string
  time: number
}

export interface CategoryResponseData {
  section: string[]
  topic: CategoryTopic
  user: CategoryUser
  topics: number
  views: number
}
