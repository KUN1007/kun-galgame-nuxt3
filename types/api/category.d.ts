export interface CategoryUser {
  name: string
  uid: string
}

export interface CategoryResponseData {
  category: string
  title: string
  user: CategoryUser
  topics: number
  views: number
}
