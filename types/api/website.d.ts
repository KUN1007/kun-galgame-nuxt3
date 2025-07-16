export interface WebsiteCategory {
  id: number
  name: string
  description: string
}

export interface WebsiteTag {
  id: number
  name: string
  level: number
}

export interface WebsiteCard {
  id: number
  name: string
  description: string
  domain: string
  ageLimit: string
  level: number
  icon: string
  tags: WebsiteTag[]
  category: string
}

export interface WebsiteDetail {
  id: number
  name: string
  url: string
  description: string
  icon: string
  view: number
  language: string
  ageLimit: 'all' | 'r18'
  category: WebsiteCategory
  tags: WebsiteTag[]
  likeCount: number
  isLiked: boolean
  favoriteCount: number
  isFavorited: boolean
  domain: string[]
  createTime: string

  created: Date | string
  updated: Date | string
}

export interface WebsiteComment {
  id: number
  websiteId: number
  content: string
  parentId: number | null
  userId: number
  created: Date | string
  edited: Date | string | null
  reply: WebsiteComment[]
  user: KunUser
  targetUser?: KunUser | null
}
