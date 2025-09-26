export interface TopicPollOption {
  id: number
  text: string
  vote_count: number | null
  is_voted: boolean
}

export interface TopicPoll {
  id: number
  title: string
  description: string

  min_choice: number
  max_choice: number
  deadline: string | Date | null

  type: string
  status: string
  result_visibility: string

  is_anonymous: boolean
  can_change_vote: boolean
  has_voted: boolean

  topic_id: number
  user: KunUser
  option: TopicPollOption[]

  voters: KunUser[]
  voters_count: number
  vote_count: number | null

  created: string | Date
  updated: string | Date
}

export interface TopicPollVoteLog {
  id: number
  created: Date | string
  option: string
  user: KunUser
}
