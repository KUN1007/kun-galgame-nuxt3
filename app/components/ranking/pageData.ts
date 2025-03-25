import type {
  RankingGetTopicsRequestData,
  RankingGetUserRequestData
} from '@/types/api/ranking'

export const topicRankingPageData = reactive<RankingGetTopicsRequestData>({
  page: '1',
  limit: '100',
  sortField: 'views',
  sortOrder: 'desc'
})

export const userRankingPageData = reactive<RankingGetUserRequestData>({
  page: '1',
  limit: '100',
  sortField: 'moemoepoint',
  sortOrder: 'desc'
})
