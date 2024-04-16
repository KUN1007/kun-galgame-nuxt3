import TopicModel from '~/server/models/topic'
import type { GetSectionRequestData, SectionTopic } from '~/types/api/section'

const getSectionTopic = async (
  section: string,
  page: number,
  limit: number,
  order: 'asc' | 'desc'
) => {
  const skip = (page - 1) * limit

  const totalCount = await TopicModel.countDocuments({
    status: { $ne: 1 },
    section: { $in: section }
  })

  const data = await TopicModel.find({
    status: { $ne: 1 },
    section: { $in: section }
  })
    .sort({ time: order })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name')
    .lean()

  const topics: SectionTopic[] = data.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    content: topic.content.slice(0, 233),
    time: topic.time,
    tags: topic.tags,
    views: topic.views,
    likes: topic.likes.length,
    replies: topic.replies.length,
    user: {
      uid: topic.user[0].uid,
      avatar: topic.user[0].avatar,
      name: topic.user[0].name
    }
  }))

  return { topics, totalCount }
}

export default defineEventHandler(async (event) => {
  const { section, page, limit, order }: GetSectionRequestData =
    await getQuery(event)
  if (!section || !page || !limit || !order) {
    return kunError(event, 10507)
  }
  if (limit !== '10') {
    return kunError(event, 10209)
  }

  const res = await getSectionTopic(
    section,
    parseInt(page),
    parseInt(limit),
    order
  )

  return res
})
