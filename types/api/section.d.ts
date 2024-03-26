export interface GetSectionRequestData {
  section: string
  page: string
  limit: string
  order: 'asc' | 'desc'
}

export interface SectionUser {
  uid: number
  name: string
  avatar: string
}

export interface SectionTopic {
  tid: number
  title: string
  content: string
  time: number
  tags: string[]
  views: number
  likes: number
  replies: number
  user: SectionUser
}
