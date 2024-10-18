import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type { HomeTopic } from '~/types/api/home'

const getHomeTopics = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  const topics = await TopicModel.find({ status: { $ne: 1 } })
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const data: HomeTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    views: topic.views,
    likes: topic.likes.length,
    replies: topic.replies.length,
    comments: topic.comments,
    time: topic.time,
    tags: topic.tags,
    section: topic.section,
    popularity: topic.popularity,
    user: {
      uid: topic.user[0].uid,
      name: topic.user[0].name,
      avatar: topic.user[0].avatar
    },
    status: topic.status,
    upvoteTime: topic.upvote_time
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit }: KunPagination = await getQuery(event)
  if (limit !== '10') {
    return kunError(event, 10209)
  }
  const result = await getHomeTopics(parseInt(page), parseInt(limit))

  return result
})
