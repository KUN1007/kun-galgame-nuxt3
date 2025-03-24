import type { GalgameResource } from './galgame-resource.d.ts'
import type { MessageType } from './message.d.ts'
import type { GalgameCard } from './galgame.d.ts'

export interface HomeMessage {
  uid: number
  name: string
  tid: number
  gid: number
  type: MessageType
  content: string
  time: number
}

export interface HomeUserStatus {
  moemoepoints: number
  isCheckIn: boolean
  hasNewMessage: boolean
}

export interface HomeTopic {
  tid: number
  title: string
  views: number
  likes: number
  replies: number
  comments: number

  time: number
  tags: string[]
  section: string[]
  user: KunUser
  status: number
  upvoteTime: number
}

export type HomeGalgame = GalgameCard

export interface HomeGalgameResources extends GalgameResource {
  name: KunLanguage
}
