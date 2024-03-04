import TopicModel from '~/server/models/topic'
import type { UserTopic } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { tidArray } = getQuery(event)

  if (!tidArray) {
    return []
  }

  const topics = await TopicModel.find({
    tid: { $in: tidArray },
    status: { $ne: 1 }
  }).limit(50)

  const responseData: UserTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    time: topic.time
  }))
  return responseData
})
