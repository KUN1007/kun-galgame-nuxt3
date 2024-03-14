export interface GetTodoRequestData {
  page: string
  limit: string
  language: Language
}

export interface GetUpdateLogRequestData {
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

export interface Todo {
  todoId: number
  status: number
  content: string
  language: string
  time: number
  completedTime: number
}

export interface UpdateLog {
  description: string
  type: UpdateType
  time: string
  upid: number
  version: string
}
