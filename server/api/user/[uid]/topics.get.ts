import UserModel from '~/server/models/user'
import TopicModel from '~/server/models/topic'
import type { UserTopic, UserGetTopicRequestData } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')
  if (!uid) {
    return kunError(event, 10101)
  }

  const { page, limit, type }: UserGetTopicRequestData = await getQuery(event)
  if (!page || !limit || !type) {
    return kunError(event, 10507)
  }
  if (limit !== '50') {
    return kunError(event, 10209)
  }
  const skip = (parseInt(page) - 1) * parseInt(limit)

  const user = await UserModel.findOne({ uid }).lean()
  if (!user) {
    return kunError(event, 10114)
  }

  const topicArray =
    {
      publish: user.topic,
      like: user.like_topic,
      upvote: user.upvote_topic,
      favorite: user.favorite_topic
    }[type] || []

  const totalCount = await TopicModel.countDocuments({
    tid: { $in: topicArray },
    status: { $ne: 1 }
  }).lean()
  const data = await TopicModel.find({
    tid: { $in: topicArray },
    status: { $ne: 1 }
  })
    .sort({ created: -1 })
    .skip(skip)
    .limit(parseInt(limit))

  const topics: UserTopic[] = data.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    time: new Date(topic.created).getTime()
  }))
  return { topics, totalCount }
})
