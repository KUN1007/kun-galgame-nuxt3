export interface UpdateLogRequestData {
  page: string
  limit: string
  language: Language
}

export interface UpdateLog {
  description: string
  time: string
  upid: number
  version: string
}
