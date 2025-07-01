export interface KunTreeNode {
  name: string
  label: string
  path: string
  children?: KunTreeNode[]
  type: 'file' | 'directory'
}

export interface KunFrontmatter {
  title: string
  banner: string
  description: string
  publishedTime: Date
  modifiedTime: Date
  category: string
  authorUid: number
  authorName: string
  authorAvatar: string
  authorHomepage: string
  pin: boolean
}
