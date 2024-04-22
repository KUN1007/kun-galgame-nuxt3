import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type { HomeTopicRequestData, HomeTopic } from '~/types/api/home'

const getHomeTopics = async (page: number, limit: number, category: string) => {
  const skip = (page - 1) * limit

  const seventeenDaysAgo = new Date()
  seventeenDaysAgo.setDate(seventeenDaysAgo.getDate() - 30)
  const seventeenDaysAgoTimestamp = seventeenDaysAgo.getTime()

  const searchQuery = {
    category: { $in: [category] },
    status: { $ne: 1 },
    time: { $gte: seventeenDaysAgoTimestamp },
    section: { $nin: ['g-other'] }
  }

  const topics = await TopicModel.find(searchQuery)
    .sort({ updated: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const data: HomeTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    views: topic.views,
    upvotes: topic.upvotes.length,
    likes: topic.likes.length,
    replies: topic.replies.length,
    comments: topic.comments,
    time: topic.time,
    content: topic.content.slice(0, 233),
    tags: topic.tags,
    section: topic.section,
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
  const { page, limit, category }: HomeTopicRequestData = await getQuery(event)
  if (limit !== '10') {
    return kunError(event, 10209)
  }
  const availableCategory = ['galgame', 'technique', 'others']
  if (!availableCategory.includes(category)) {
    return kunError(event, 10220)
  }

  const result = await getHomeTopics(
    parseInt(page),
    parseInt(limit),
    category.charAt(0).toUpperCase() + category.slice(1)
  )

  return result
})
