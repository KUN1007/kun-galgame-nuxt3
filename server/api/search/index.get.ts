import {
  searchTopic,
  searchGalgame,
  searchComment,
  searchReply,
  searchUser
} from './search'
import type { SearchRequestData, SearchType } from '~/types/api/search'

const search = async (
  keywords: string,
  type: SearchType,
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
    return await searchTopic(escapedKeywords, skip, limit)
  } else if (type === 'galgame') {
    return await searchGalgame(escapedKeywords, skip, limit)
  } else if (type === 'user') {
    return await searchUser(escapedKeywords.join(''), skip, limit)
  } else if (type === 'reply') {
    return await searchReply(escapedKeywords.join(''), skip, limit)
  } else {
    return await searchComment(escapedKeywords.join(''), skip, limit)
  }
}

export default defineEventHandler(async (event) => {
  const { keywords, type, page, limit }: SearchRequestData =
    await getQuery(event)

  if (limit !== '10') {
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
