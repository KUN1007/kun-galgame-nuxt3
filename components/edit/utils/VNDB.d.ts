export interface Title {
  title: string
}

export interface VNDBData {
  id: number
  title: string
  titles: Title[]
  aliases: string[]
  languages: string[]
  platforms: string[]
  description?: string
}

export interface VNDB {
  title: string
  titles: Title[]
  description?: string
  aliases: string[]
}

export interface VNDBResponse {
  more: boolean
  results: VNDB[]
}
