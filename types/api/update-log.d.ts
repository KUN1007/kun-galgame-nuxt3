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
  time: number
  completedTime: number
}

export interface UpdateLog {
  upid: number
  type: UpdateType
  content: string
  time: string
  version: string
}
