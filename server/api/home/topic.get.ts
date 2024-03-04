import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type {
  SortField,
  SortOrder,
  HomeTopicRequestData,
  HomeTopic
} from '~/types/api/home'

const getHomeTopics = async (
  category: string[],
  page: number,
  limit: number,
  sortField: SortField,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const searchQuery = {
    category: { $in: category },
    status: { $ne: 1 }
  }

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc'
  }

  const topics = await TopicModel.find(searchQuery)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name')
    .lean()

  const data: HomeTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    views: topic.views,
    upvotesCount: topic.upvotes_count,
    likesCount: topic.likes_count,
    repliesCount: topic.replies_count,
    comments: topic.comments,
    time: topic.time,
    content: topic.content.slice(0, 233),
    tags: topic.tags,
    category: topic.category,
    popularity: topic.popularity,
    user: {
      uid: topic.user[0].uid,
      avatar: topic.user[0].avatar,
      name: topic.user[0].name
    },
    status: topic.status,
    upvote_time: topic.upvote_time
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { category, page, limit, sortField, sortOrder }: HomeTopicRequestData =
    await getQuery(event)

  if (limit !== '10') {
    kunError(event, 10209)
    return
  }

  // TODO: Schema hasn't been registered for model 'user', maybe it can be solved in the future
  await UserModel.findOne()

  const result = await getHomeTopics(
    [category],
    parseInt(page),
    parseInt(limit),
    sortField,
    sortOrder
  )

  return result
})
