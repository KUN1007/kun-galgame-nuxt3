export interface SectionTopic {
  id: number
  title: string
  content: string
  section: string[]
  tag: string[]
  view: number
  like: number
  reply: number
  user: KunUser
  created: Date | string
}
