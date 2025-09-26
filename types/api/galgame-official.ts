import type { KunGalgameOfficialCategory } from '~/constants/galgameOfficial'
import type { GalgameCard } from './galgame'

export interface GalgameOfficial {
  id: number
  name: string
  link: string
  category: KunGalgameOfficialCategory
  lang: string
}

export interface GalgameOfficialItem {
  id: number
  name: string
  link: string
  category: KunGalgameOfficialCategory
  lang: string
  alias: string[]
  galgameCount: number
}

export interface GalgameOfficialDetail {
  id: number
  name: string
  link: string
  category: KunGalgameOfficialCategory
  lang: string
  description: string
  alias: string[]
  galgame: GalgameCard[]
  galgameCount: number
}
