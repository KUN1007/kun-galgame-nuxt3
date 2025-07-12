import type {
  getTopicRankingSchema,
  getGalgameRankingSchema,
  getUserRankingSchema
} from '~/validations/ranking'
import type { z } from 'zod'

type Topic = z.infer<typeof getTopicRankingSchema>
type Galgame = z.infer<typeof getGalgameRankingSchema>
type User = z.infer<typeof getUserRankingSchema>

export const topicRankingPageData = reactive<Topic>({
  page: 1,
  limit: 100,
  sortField: 'view',
  sortOrder: 'desc'
})

export const galgameRankingPageData = reactive<Galgame>({
  page: 1,
  limit: 100,
  sortField: 'view',
  sortOrder: 'desc'
})

export const userRankingPageData = reactive<User>({
  page: 1,
  limit: 100,
  sortField: 'moemoepoint',
  sortOrder: 'desc'
})
