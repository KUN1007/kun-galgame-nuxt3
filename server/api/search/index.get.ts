import {
  searchTopic,
  searchGalgame,
  searchComment,
  searchReply,
  searchUser
} from './_search'
import { getSearchResultSchema } from '~/validations/search'
import type { z } from 'zod'

const search = async (input: z.infer<typeof getSearchResultSchema>) => {
  const { keywords, type, page, limit } = input

  const skip = (page - 1) * limit
  const keywordsArray: string[] = keywords
    .trim()
    .slice(0, 107)
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
  const input = await kunParsePostBody(event, getSearchResultSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  // const nsfw = getNSFWCookie(event)

  const result = await search(input)

  return result
})
