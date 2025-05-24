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
  uid: number
  name: string
  tid: number
  gid: number
  type: MessageType
  content: string
  time: number
}
