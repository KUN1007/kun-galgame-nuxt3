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

export interface Todo {
  id: number
  status: number
  type: string
  content: KunLanguage
  completedTime: Date | string | null
  created: Date | string
}

export interface UpdateLog {
  id: number
  type: UpdateType
  content: KunLanguage
  version: string
  created: Date | string
}
