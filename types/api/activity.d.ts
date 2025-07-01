export type KunActivityType =
  | 'all'
  | 'upvoted'
  | 'replied'
  | 'commented'
  | 'requested'

export interface KunActivityRequestData {
  page: string
  limit: string
  type: KunActivityType
}

export interface KunActivity {
  user: KunUser
  link: string
  type: MessageType
  content: string
  created: Date | string
}
