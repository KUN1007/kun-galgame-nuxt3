import type { Ctx } from '@milkdown/ctx'
import type { ShallowRef } from 'vue'

export interface EditStorePersist {
  mode: 'preview' | 'code'

  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]
}

export interface EditStoreTemp {
  tid: number
  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]

  isTopicRewriting: boolean
  autosaveCount: number

  editorContext: ShallowRef<Ctx | null>
}
