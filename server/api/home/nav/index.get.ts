import TopicModel from '~/server/models/topic'
import type { TypeToGet, HomeNavTopic } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const { type }: { type: TypeToGet } = await getQuery(event)

  const seventeenDaysAgo = new Date()
  seventeenDaysAgo.setDate(seventeenDaysAgo.getDate() - 17)
  const seventeenDaysAgoTimestamp = seventeenDaysAgo.getTime()

  const sortOptions: Record<string, -1> =
    type === 'time' ? { time: -1 } : { popularity: -1 }

  const topics = await TopicModel.find(
    { time: { $gte: seventeenDaysAgoTimestamp } },
    'tid title time popularity'
  )
    .sort(sortOptions)
    .limit(7)
    .lean()

  const data: HomeNavTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    time: topic.time,
    popularity: topic.popularity
  }))

  return data
})
