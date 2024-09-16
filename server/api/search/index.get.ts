import TopicModel from '~/server/models/topic'
import GalgameModel from '~/server/models/galgame'
import type { SearchRequestData } from '~/types/api/search'

const searchTopic = async (keywords: string[], skip: number, limit: number) => {
  const searchQuery = {
    $and: [
      { status: { $ne: 1 } },
      {
        $or: [
          { title: { $regex: keywords.join('|'), $options: 'i' } },
          { content: { $regex: keywords.join('|'), $options: 'i' } },
          { category: { $in: keywords } },
          { tags: { $in: keywords } }
        ]
      }
    ]
  }

  const topics = await TopicModel.find(searchQuery)
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const data = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    content: topic.content.slice(0, 107)
  }))

  return data
}

const searchGalgame = async (
  keywords: string[],
  skip: number,
  limit: number
) => {
  const searchQuery = {
    $and: [
      { status: { $ne: 1 } },
      {
        $or: [
          { 'name.en-us': { $regex: keywords.join('|'), $options: 'i' } },
          { 'name.ja-jp': { $regex: keywords.join('|'), $options: 'i' } },
          { 'name.zh-cn': { $regex: keywords.join('|'), $options: 'i' } },
          {
            'introduction.en-us': { $regex: keywords.join('|'), $options: 'i' }
          },
          {
            'introduction.ja-jp': { $regex: keywords.join('|'), $options: 'i' }
          },
          {
            'introduction.zh-cn': { $regex: keywords.join('|'), $options: 'i' }
          },
          { alias: { $in: keywords } },
          { tags: { $in: keywords } }
        ]
      }
    ]
  }

  const data = await GalgameModel.find(searchQuery)
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const galgames = data.map((galgame) => ({
    tid: -galgame.gid,
    title: galgame.name,
    content: Object.entries(galgame.introduction).map(([key, value]) => [
      key,
      value.slice(0, 107)
    ])
  }))

  return galgames
}

const search = async (
  keywords: string,
  type: 'topic' | 'galgame',
  page: number,
  limit: number
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

  if (type === 'topic') {
    const result = await searchTopic(escapedKeywords, skip, limit)
    return result
  } else {
    const result = await searchGalgame(escapedKeywords, skip, limit)
    return result
  }
}

export default defineEventHandler(async (event) => {
  const { keywords, type, page, limit }: SearchRequestData =
    await getQuery(event)

  if (limit !== '7') {
    return kunError(event, 10209)
  }

  const result = await search(
    keywords.trim().slice(0, 40),
    type,
    parseInt(page),
    parseInt(limit)
  )

  return result
})
