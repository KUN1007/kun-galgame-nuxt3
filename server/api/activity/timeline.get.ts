import { getActivityTimelineData } from '~/server/utils/activityTimeline'
import { getActivityTimelineSchema } from '~/validations/activity'
import { getNSFWCookie } from '~/server/utils/getNSFWCookie'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getActivityTimelineSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const nsfw = getNSFWCookie(event)

  const { items, totalCount } = await getActivityTimelineData({
    page,
    limit,
    nsfw
  })

  return { items, totalCount }
})
