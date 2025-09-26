import type { GalgameCard } from './galgame'

export interface GalgameEngine {
  id: number
  name: string
}

export interface GalgameEngineItem {
  id: number
  name: string
  alias: string[]
  galgameCount: number
}

export interface GalgameEngineDetail {
  id: number
  name: string
  description: string
  alias: string[]
  galgame: GalgameCard[]
  galgameCount: number
}
