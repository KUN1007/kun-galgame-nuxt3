import type { GalgameResource } from './galgame-resource.d.ts'
import type { MessageType } from './message.d.ts'
import type { GalgameCard } from './galgame.d.ts'

export interface HomeUserStatus {
  moemoepoints: number
  isCheckIn: boolean
  hasNewMessage: boolean
}

export interface HomeTopic {
  id: number
  title: string
  view: number

  section: string[]
  tag: string[]
  user: KunUser
  status: number

  likeCount: number
  replyCount: number
  commentCount: number

  statusUpdateTime: Date | string
  upvoteTime: Date | string | null
}

export type HomeGalgame = GalgameCard

export interface HomeGalgameResources extends GalgameResource {
  galgameName: KunLanguage
}
