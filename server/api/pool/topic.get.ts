import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type {
  SortFieldPool,
  PoolTopicsRequestData,
  PoolTopic
} from '~/types/api/pool'

const getPoolTopics = async (
  page: number,
  limit: number,
  sortField: SortFieldPool,
  sortOrder: KunOrder,
  category: string
) => {
  const skip = (page - 1) * limit

  const queryData = {
    status: { $ne: 1 },
    ...(category !== 'All'
      ? { category: { $elemMatch: { $eq: category } } }
      : {})
  }

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc'
  }

  const topics = await TopicModel.find(queryData)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const data: PoolTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    user: {
      uid: topic.user[0].uid,
      avatar: topic.user[0].avatar,
      name: topic.user[0].name
    },
    views: topic.views,
    section: topic.section,
    tags: topic.tags,
    likes: topic.likes.length,
    replies: topic.replies.length,
    comments: topic.comments,
    time: topic.time
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder, category }: PoolTopicsRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder || !category) {
    return kunError(event, 10507)
  }
  const availableCategory = ['all', 'galgame', 'technique', 'others']
  if (!availableCategory.includes(category)) {
    return kunError(event, 10220)
  }
  if (limit !== '24') {
    return kunError(event, 10209)
  }

  const topics = await getPoolTopics(
    parseInt(page),
    parseInt(limit),
    sortField as SortFieldPool,
    sortOrder as KunOrder,
    category.charAt(0).toUpperCase() + category.slice(1)
  )

  return topics
})
