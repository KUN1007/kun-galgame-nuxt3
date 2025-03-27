export interface NonMoeLogRequestData {
  page: string
  limit: string
}

export interface NonMoeLog {
  nid: number
  uid: number
  name: string
  description: KunLanguage
  time: Date | string
  result: string | number
}
