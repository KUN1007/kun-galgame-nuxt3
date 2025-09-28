import type { ActivityItem, ActivityEventType } from '~/types/api/activity'
import { activityFetchers } from '~/server/utils/activityFetchers'

export interface ActivityTimelineOptions {
  page: number
  limit: number
  nsfw?: string | null
}

export const getActivityTimelineData = async ({
  page,
  limit,
  nsfw
}: ActivityTimelineOptions): Promise<{
  items: ActivityItem[]
  totalCount: number
}> => {
  const skip = (page - 1) * limit
  const isSFW = nsfw === 'sfw'
  const takeWindow = skip + limit

  const types: ActivityEventType[] = [
    'GALGAME_CREATION',
    'GALGAME_COMMENT_CREATION',
    'GALGAME_PR_CREATION',
    'GALGAME_RESOURCE_CREATION',
    'TOOLSET_CREATION',
    'TOOLSET_RESOURCE_CREATION',
    'TOOLSET_COMMENT_CREATION',
    'TOPIC_CREATION',
    'TOPIC_REPLY_CREATION',
    'TOPIC_COMMENT_CREATION',
    'GALGAME_WEBSITE_CREATION',
    'GALGAME_WEBSITE_COMMENT_CREATION',
    'TODO_CREATION'
  ]

  const results = await Promise.all(
    types.map((t) => activityFetchers[t](takeWindow, 0, isSFW))
  )

  const allItems: ActivityItem[] = results.flatMap((r) => r.items)
  allItems.sort(
    (a, b) => (b.timestamp as Date).getTime() - (a.timestamp as Date).getTime()
  )
  const pagedItems = allItems.slice(skip, skip + limit)

  const totalCount = results.reduce((sum, r) => sum + r.total, 0)

  return { items: pagedItems, totalCount }
}
