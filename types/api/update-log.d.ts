export interface UpdateLogRequestData {
  page: string
  limit: string
}

export interface UpdateLog {
  description: string
  time: number
  upid: number
  version: string
}
