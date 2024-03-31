export interface NonMoeLogRequestData {
  page: string
  limit: string
  language: Language
}

export interface NonMoeLog {
  nid: number
  uid: number
  name: string
  description: string
  time: number
  result: string | number
}
