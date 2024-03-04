import TopicModel from '~/server/models/topic'
import type {
  TopicSortFieldRanking,
  SortOrder,
  RankingGetTopicsRequestData,
  RankingTopics
} from '~/types/api/ranking'

const getTopicRanking = async (
  page: number,
  limit: number,
  sortField: TopicSortFieldRanking,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc'
  }

  const topics = await TopicModel.find()
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: RankingTopics[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    field: topic[sortField]
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder }: RankingGetTopicsRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    kunError(event, 10507)
    return
  }
  if (limit !== '30') {
    kunError(event, 10209)
    return
  }

  const topics = await getTopicRanking(
    parseInt(page),
    parseInt(limit),
    sortField,
    sortOrder
  )

  return topics
})
