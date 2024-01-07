import TopicModel from '~/server/models/topic'
import type {
  SortOrder,
  SortFieldPool,
  PoolTopicsRequestData,
  PoolTopic,
} from '~/types/api/pool'

const getPoolTopics = async (
  page: number,
  limit: number,
  sortField: SortFieldPool,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
  }

  const topics = await TopicModel.find()
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean()

  const data: PoolTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    views: topic.views,
    likesCount: topic.likes_count,
    time: topic.time,
    content: topic.content.slice(0, 233),
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder }: PoolTopicsRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    kunError(event, 10507)
    return
  }
  if (limit !== '10') {
    kunError(event, 10209)
    return
  }

  const topics = await getPoolTopics(
    parseInt(page),
    parseInt(limit),
    sortField as SortFieldPool,
    sortOrder as SortOrder
  )

  return topics
})
