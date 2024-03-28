import TopicModel from '~/server/models/topic'
import type { HomePinnedTopic } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const homePinnedTopicCache: HomePinnedTopic[] | null =
    await useStorage('redis').getItem(`home:pinned`)
  if (homePinnedTopicCache) {
    return homePinnedTopicCache
  }

  const topics = await TopicModel.find({ status: 2 }).lean()

  const data: HomePinnedTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    time: topic.time
  }))

  if (topics.length) {
    await useStorage('redis').setItem(`home:pinned`, data, {
      ttl: 60 * 60
    })
  }

  return topics
})
