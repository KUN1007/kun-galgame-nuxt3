import TopicModel from '~/server/models/topic'
import type { TypeToGet, HomeNavTopic } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const { type }: { type: TypeToGet } = await getQuery(event)

  const sortOptions: Record<string, -1> =
    type === 'time' ? { time: -1 } : { popularity: -1 }

  const topics = await TopicModel.find({}, 'tid title time popularity')
    .sort(sortOptions)
    .limit(7)
    .lean()

  const data: HomeNavTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    time: topic.time,
    popularity: topic.popularity,
  }))

  return data
})
