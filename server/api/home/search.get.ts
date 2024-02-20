import TopicModel from '~/server/models/topic'
import type {
  SortField,
  SortOrder,
  SearchTopicRequestData,
} from '~/types/api/home'

const searchTopics = async (
  keywords: string,
  category: string[],
  page: number,
  limit: number,
  sortField: SortField,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit
  const keywordsArray: string[] = keywords
    .trim()
    .slice(0, 40)
    .split(' ')
    .filter((keyword) => keyword.trim() !== '')

  const escapedKeywords = keywordsArray.map((keyword) =>
    keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )

  const searchQuery = {
    $and: [
      { category: { $in: category }, status: { $ne: 1 } },
      {
        $or: [
          { title: { $regex: escapedKeywords.join('|'), $options: 'i' } },
          { content: { $regex: escapedKeywords.join('|'), $options: 'i' } },
          { category: { $in: escapedKeywords } },
          { tags: { $in: escapedKeywords } },
        ],
      },
    ],
  }

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
  }

  const topics = await TopicModel.find(searchQuery)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean()

  const data = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    category: topic.category,
    content: topic.content.slice(0, 107),
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const {
    keywords,
    category,
    page,
    limit,
    sortField,
    sortOrder,
  }: SearchTopicRequestData = await getQuery(event)

  if (limit !== '7') {
    kunError(event, 10209)
    return
  }

  const result = await searchTopics(
    keywords.trim().slice(0, 40),
    category,
    parseInt(page),
    parseInt(limit),
    sortField,
    sortOrder
  )

  return result
})
