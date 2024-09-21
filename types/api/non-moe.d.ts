export interface NonMoeLogRequestData {
  page: string
  limit: string
  language: Language
}

export interface NonMoeLog {
  nid: number
  uid: number
  name: string
  description: KunLanguage
  time: number
  result: string | number
}
