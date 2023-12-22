import TagModel from '~/server/models/tag'

export default defineEventHandler(async (event) => {
  const topTags = await TagModel.aggregate([
    { $group: { _id: '$name', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ])

  const topTagNames: string[] = topTags.map((tag) => tag._id)

  return topTagNames
})
