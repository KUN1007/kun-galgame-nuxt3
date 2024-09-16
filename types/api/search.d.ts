import type { HomeTopic, HomeGalgame } from './home'

export type SearchResultTopic = HomeTopic
export type SearchResultGalgame = HomeGalgame

export interface SearchResultUser {
  uid: number
  name: string
  avatar: string
  bio: string
  time: number
}

export interface SearchResultReply {
  tid: number
  title: string
  content: string
  user: KunUser
  time: number
}

export interface SearchResultComment {
  tid: number
  title: string
  content: string
  user: KunUser
  time: number
}

export type SearchType = 'topic' | 'galgame' | 'user' | 'reply' | 'comment'
export type SearchResult =
  | SearchResultTopic
  | SearchResultGalgame
  | SearchResultUser
  | SearchResultReply
  | SearchResultComment

export interface SearchRequestData {
  keywords: string
  type: SearchType
  page: string
  limit: string
}
