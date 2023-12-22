import TopicModel from '~/server/models/topic'

export default defineEventHandler(async (event) => {
  const topics = await TopicModel.find({}, 'tid title time')
    .sort({ time: -1 })
    .limit(10)
    .lean()

  const data = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    time: topic.time,
  }))

  return data
})
