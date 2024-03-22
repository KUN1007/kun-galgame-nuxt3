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
  creator: string
  creator_id: number
  time: number
  completer: string
  completer_id: number
  completedTime: number
}

export interface UpdateLog {
  upid: number
  type: UpdateType
  content: string
  time: string
  version: string
}
