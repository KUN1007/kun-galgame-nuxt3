import type { GalgameCard } from './galgame.d.ts'

export interface GalgameSample {
  name: KunLanguage
  banner: string
}

export interface GalgameSeries {
  id: number
  name: string
  description: string
  isNSFW: boolean
  sampleGalgame: GalgameSample[]
  galgameCount: number
  created: Date | string
  updated: Date | string
}

export interface GalgameSeriesDetail extends GalgameSeries {
  description: string
  galgame: GalgameCard[]
}

export interface GalgameSearchSearchItem {
  id: number
  name: string
}
