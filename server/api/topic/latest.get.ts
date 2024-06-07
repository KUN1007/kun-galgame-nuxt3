import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
// import { markdownToText } from '~/utils/markdownToText'
import type { TopicRSS } from '~/types/api/topic'

export default defineEventHandler(async (event) => {
  const { language }: { language: 'en-us' | 'zh-cn' } = await getQuery(event)
  if (!language) {
    return kunError(event, 10507)
  }

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
