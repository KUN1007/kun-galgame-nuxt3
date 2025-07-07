export type GalgameHistoryAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'merged'
  | 'declined'
export type GalgameHistoryType = 'galgame' | 'banner' | 'link' | 'pr'

export interface CreateGalgameHistoryRequestData {
  galgame_id: number
  user_id: number
  action: GalgameHistoryAction
  type: GalgameHistoryType
  content: string
}

export interface GalgameHistory {
  id: number
  action: GalgameHistoryAction
  type: GalgameHistoryType
  content: string
  user: KunUser
  created: Date | string
}
