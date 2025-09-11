export interface LatestTopicInfo {
  id: number
  title: string
  created: Date | string
}

export interface SectionStats {
  id: number
  name: string
  topicCount: number
  viewCount: number
  latestTopic: LatestTopicInfo | null
}
