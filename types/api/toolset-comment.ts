export interface ToolsetComment {
  id: number
  toolsetId: number
  created: Date | string
  content: string
  edited: Date | string | null
  parentId: number | null
  userId: number
  reply: ToolsetComment[]
  user: KunUser
  targetUser?: KunUser | null
}
