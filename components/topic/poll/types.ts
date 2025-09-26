export interface PollFormData {
  topic_id: number
  poll_id: number
  title: string
  description: string
  options: {
    id?: number
    text: string
    _status?: 'new' | 'existing' | 'deleted'
  }[]
  type: 'single' | 'multiple'
  min_choice: number
  max_choice: number
  deadline?: string
  result_visibility: 'always' | 'after_vote' | 'after_deadline'
  is_anonymous: boolean
  can_change_vote: boolean
  status: 'open' | 'closed'
}
