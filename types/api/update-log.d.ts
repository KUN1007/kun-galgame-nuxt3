export interface UpdateLogRequestData {
  page: string
  limit: string
  language: Language
}

export type UpdateType =
  | 'feat'
  | 'pref'
  | 'fix'
  | 'styles'
  | 'mod'
  | 'chore'
  | 'sec'
  | 'refactor'
  | 'docs'
  | 'test'

export interface UpdateLog {
  description: string
  type: UpdateType
  time: string
  upid: number
  version: string
}
