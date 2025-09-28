import { activityFetchers } from '~/server/utils/activityFetchers'
import { getActivitySchema } from '~/validations/activity'
import { getNSFWCookie } from '~/server/utils/getNSFWCookie'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getActivitySchema)
  if (typeof input === 'string') {
    return kunError(event, input, 400)
  }

  const { page, limit, type } = input
  const skip = (page - 1) * limit

  const nsfw = getNSFWCookie(event)
  const isSFW = nsfw === 'sfw'

  const fetcher = activityFetchers[type]
  const { items, total } = await fetcher(limit, skip, isSFW)

  return { items, totalCount: total }
})

