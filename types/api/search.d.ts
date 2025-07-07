import type { HomeTopic, HomeGalgame } from './home'

export type SearchResultTopic = HomeTopic
export type SearchResultGalgame = HomeGalgame

export interface SearchResultUser extends KunUser {
  bio: string
  moemoepoint: number
  created: Date | string
}

export interface SearchResultReply {
  topicId: number
  topicTitle: string
  content: string
  user: KunUser
  targetUser: KunUser
  created: Date | string
}

export type SearchResultComment = SearchResultReply

export type SearchType = 'topic' | 'galgame' | 'user' | 'reply' | 'comment'
export type SearchResult =
  | SearchResultTopic
  | SearchResultGalgame
  | SearchResultUser
  | SearchResultReply
  | SearchResultComment
