import TopicModel from '~/server/models/topic'

export default defineEventHandler(async (event) => {
  const topics = await TopicModel.find({}, 'tid title popularity')
    .sort({ popularity: -1 })
    .limit(7)
    .lean()

  const data = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    popularity: topic.popularity,
  }))

  return data
})
