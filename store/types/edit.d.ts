import type { Ctx } from '@milkdown/ctx'
import type { ShallowRef } from 'vue'

export interface EditStorePersist {
  editorHeight: number
  textCount: number

  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]

  isShowHotKeywords: boolean
}

export interface EditStoreTemp {
  tid: number
  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]

  textCount: number
  isTopicRewriting: boolean

  autosaveCount: number

  editorContext: ShallowRef<Ctx | null>
}
