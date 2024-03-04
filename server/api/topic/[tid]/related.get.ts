import TopicModel from '~/server/models/topic'
import type { TopicAside } from '~/types/api/topic'

export default defineEventHandler(async (event) => {
  const tid = getRouterParam(event, 'tid')
  if (!tid) {
    kunError(event, 10210)
    return
  }

  const query: { tags: string[] | string } = await getQuery(event)
  const tags = Array.isArray(query.tags) ? query.tags : [query.tags]
  if (!tags || tags.length > 7) {
    kunError(event, 10507)
    return
  }

  const relatedTopics = await TopicModel.find({
    tags: { $in: tags },
    tid: { $ne: tid }
  })
    .sort({ popularity: -1 })
    .limit(5)
    .select('title tid')

  const topic: TopicAside[] = relatedTopics.map((topic) => ({
    title: topic.title,
    tid: topic.tid
  }))

  return topic
})
