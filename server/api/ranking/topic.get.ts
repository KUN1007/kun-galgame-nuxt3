import TopicModel from '~/server/models/topic'
import type {
  TopicSortFieldRanking,
  RankingGetTopicsRequestData,
  RankingTopics
} from '~/types/api/ranking'

const getTopicRanking = async (
  page: number,
  limit: number,
  sortField: TopicSortFieldRanking,
  sortOrder: KunOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 1 | -1> = {
    [sortField]: sortOrder === 'asc' ? 1 : -1
  }

  const numberField = ['views', 'comments']
  if (numberField.includes(sortField)) {
    const topics = await TopicModel.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const responseData: RankingTopics[] = topics.map((topic) => ({
      tid: topic.tid,
      title: topic.title,
      field: topic[sortField] as number
    }))

    return responseData
  } else {
    const topics: RankingTopics[] = await TopicModel.aggregate([
      { $unwind: `$${sortField}` },
      {
        $group: {
          _id: '$_id',
          tid: { $first: '$tid' },
          title: { $first: '$title' },
          [sortField]: { $sum: 1 }
        }
      },
      { $sort: sortOptions },
      { $skip: skip },
      { $limit: limit },
      { $project: { _id: 0, tid: 1, title: 1, field: `$${sortField}` } }
    ])

    return topics
  }
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder }: RankingGetTopicsRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    return kunError(event, 10507)
  }
  if (limit !== '30') {
    return kunError(event, 10209)
  }

  const rankingTopicCache: RankingTopics[] | null = await useStorage(
    'redis'
  ).getItem(`ranking:topic:${page}:${limit}:${sortField}:${sortOrder}`)
  if (rankingTopicCache) {
    return rankingTopicCache
  }

  const topics = await getTopicRanking(
    parseInt(page),
    parseInt(limit),
    sortField,
    sortOrder
  )

  await useStorage('redis').setItem(
    `ranking:topic:${page}:${limit}:${sortField}:${sortOrder}`,
    topics,
    { ttl: 17 * 60 }
  )

  return topics
})
