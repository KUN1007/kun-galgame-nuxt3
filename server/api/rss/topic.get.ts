import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type { TopicRSS } from '~/types/api/rss'

export default defineEventHandler(async (event) => {
  const data = await TopicModel.find()
    .sort({ created: 'desc' })
    .limit(10)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const topics: TopicRSS[] = data.map((topic) => ({
    tid: topic.tid,
    name: topic.title,
    user: {
      uid: topic.user[0].uid,
      name: topic.user[0].name,
      avatar: topic.user[0].avatar
    },
    time: topic.time,
    description: topic.content.slice(0, 233)
  }))

  return topics
})
