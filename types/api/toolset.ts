export interface ToolsetCard {
  id: number
  name: string
  description: string
  user: KunUser
  type: string
  platform: string
  language: string
  version: string
  download: number
  commentCount: number
  practicalityAvg: number | null
}

export interface ToolsetDetail {
  id: number
  name: string
  description: string
  type: string
  platform: string
  language: string
  version: string
  homepage: string[]
  download: number
  user: KunUser
  aliases: string[]
  practicalityAvg: number | null
  practicalityCount: number
}

export interface ToolsetRating {
  counts: {
    [x: number]: number
  }
  avg: number
  mine: number
}
