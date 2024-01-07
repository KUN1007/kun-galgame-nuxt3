export type SortOrder = 'asc' | 'desc'

export interface NonMoeLogRequestData {
  page: string
  limit: string
  sortOrder: SortOrder
}

export interface NonMoeLog {
  nid: number
  uid: number
  name: string
  description: string
  time: number
  result: string
}
