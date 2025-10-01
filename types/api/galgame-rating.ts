import type { GalgameOfficialItem } from './galgame-official'
import type { GalgameSeries } from './galgame-series'

export interface GalgameInfoForRating {
  id: number
  name: KunLanguage
  official: GalgameOfficialItem[]
  ageLimit: string
  originalLanguage: string
  banner: string
  // rating overall average
  rating: number
  ratingCount: number
}

export interface GalgameRatingCard {
  id: number
  galgameId: number
  user: KunUser
  recommend: string
  overall: number
  view: number
  galgameType: string[]
  play_status: string

  likeCount: number
  created: Date | string
  updated: Date | string
}

export interface GalgameRatingComment {
  id: number
  content: string
  user: KunUser
  targetUser: KunUser | null

  created: Date | string
  updated: Date | string
}

export interface GalgameRatingDetails extends GalgameRatingCard {
  art: number
  story: number
  music: number
  character: number
  route: number
  system: number
  voice: number
  replay_value: number

  spoiler_level: string
  short_summary: string

  isLiked: boolean
  likedUsers: KunUser[]
  comments: GalgameRatingComment[]
  galgame: GalgameInfoForRating
  galgameSeries: GalgameSeries | null
}

export interface GalgamePageRatingCard extends GalgameRatingCard {
  art: number
  story: number
  music: number
  character: number
  route: number
  system: number
  voice: number
  replay_value: number

  spoiler_level: string
  short_summary: string

  isLiked: boolean
}
