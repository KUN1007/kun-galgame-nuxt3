import prisma from '~/prisma/prisma'
import { getPreferredLanguageText } from '~/utils/getPreferredLanguageText'
import { markdownToText } from '~/utils/markdownToText'
import { getActivityTimelineSchema } from '~/validations/activity'
import { getNSFWCookie } from '~/server/utils/getNSFWCookie'
import type { ActivityItem } from '~/types/api/activity'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getActivityTimelineSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { page, limit } = input
  const skip = (page - 1) * limit

  const nsfw = getNSFWCookie(event)
  const isSFW = nsfw === 'sfw'
  const contentLimit = isSFW ? 'sfw' : undefined

  // Fetch a larger window to ensure correct cross-type pagination
  const takeWindow = skip + limit

  const fetchers: Array<Promise<ActivityItem[]>> = [
    prisma.galgame
      .findMany({
        where: { content_limit: contentLimit },
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          name_en_us: true,
          name_ja_jp: true,
          name_zh_cn: true,
          name_zh_tw: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } }
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `galgame-${item.id}`,
          type: 'GALGAME_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/galgame/${item.id}`,
          content: getPreferredLanguageText({
            'en-us': item.name_en_us,
            'ja-jp': item.name_ja_jp,
            'zh-cn': item.name_zh_cn,
            'zh-tw': item.name_zh_tw
          })
        }))
      ),

    prisma.galgame_comment
      .findMany({
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          galgame: { select: { id: true, name_zh_cn: true, name_en_us: true } }
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `galgame-comment-${item.id}`,
          type: 'GALGAME_COMMENT_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/galgame/${item.galgame.id}`,
          content: item.content.slice(0, 100)
        }))
      ),

    prisma.galgame_pr
      .findMany({
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          created: true,
          new_data: true,
          user: { select: { id: true, name: true, avatar: true } },
          galgame: { select: { id: true } }
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `galgame-pr-${item.id}`,
          type: 'GALGAME_PR_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/galgame/${item.galgame.id}`,
          content: Object.values(item.new_data || {})
            .join('')
            .slice(0, 100)
        }))
      ),

    prisma.galgame_resource
      .findMany({
        where: { galgame: { content_limit: contentLimit } },
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          type: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          galgame: {
            select: {
              id: true,
              name_en_us: true,
              name_ja_jp: true,
              name_zh_cn: true,
              name_zh_tw: true
            }
          }
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `galgame-resource-${item.id}`,
          type: 'GALGAME_RESOURCE_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/galgame/${item.galgame.id}`,
          content: `在《${getPreferredLanguageText({
            'en-us': item.galgame.name_en_us,
            'ja-jp': item.galgame.name_ja_jp,
            'zh-cn': item.galgame.name_zh_cn,
            'zh-tw': item.galgame.name_zh_tw
          })}》发布了下载资源`
        }))
      ),

    prisma.topic
      .findMany({
        where: { status: { not: 1 }, ...(isSFW ? { is_nsfw: false } : {}) },
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          title: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } }
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `topic-${item.id}`,
          type: 'TOPIC_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/topic/${item.id}`,
          content: item.title
        }))
      ),

    prisma.topic_reply
      .findMany({
        where: isSFW ? { topic: { is_nsfw: false } } : undefined,
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          topic_id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          target: { select: { content: true } }
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `topic-reply-${item.id}`,
          type: 'TOPIC_REPLY_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/topic/${item.topic_id}`,
          content: markdownToText(
            `${item.content}${item.target.map((t) => t.content).join('')}`
          ).slice(0, 100)
        }))
      ),

    prisma.topic_comment
      .findMany({
        where: isSFW ? { topic: { is_nsfw: false } } : undefined,
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          topic_id: true
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `topic-comment-${item.id}`,
          type: 'TOPIC_COMMENT_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/topic/${item.topic_id}`,
          content: item.content.substring(0, 100)
        }))
      ),

    prisma.galgame_website_comment
      .findMany({
        orderBy: { created: 'desc' },
        take: takeWindow,
        select: {
          id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          website: { select: { url: true } }
        }
      })
      .then((items) =>
        items.map((item) => ({
          uniqueId: `galgame-website-comment-${item.id}`,
          type: 'GALGAME_WEBSITE_COMMENT_CREATION' as const,
          timestamp: item.created,
          actor: item.user,
          link: `/website/${item.website.url}`,
          content: item.content.substring(0, 100)
        }))
      )
  ]

  const results = await Promise.allSettled(fetchers)
  const allItems: ActivityItem[] = results
    .filter(
      (r): r is PromiseFulfilledResult<ActivityItem[]> =>
        r.status === 'fulfilled'
    )
    .flatMap((r) => r.value)

  allItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  const pagedItems = allItems.slice(skip, skip + limit)

  const countResults = await Promise.allSettled([
    prisma.galgame.count({ where: { content_limit: contentLimit } }),
    prisma.galgame_comment.count(),
    prisma.galgame_pr.count(),
    prisma.galgame_resource.count({
      where: { galgame: { content_limit: contentLimit } }
    }),
    prisma.topic.count({
      where: { status: { not: 1 }, ...(isSFW ? { is_nsfw: false } : {}) }
    }),
    prisma.topic_reply.count({
      where: isSFW ? { topic: { is_nsfw: false } } : undefined
    }),
    prisma.topic_comment.count({
      where: isSFW ? { topic: { is_nsfw: false } } : undefined
    }),
    prisma.galgame_website_comment.count()
  ])

  const totalCount = countResults
    .filter(
      (r): r is PromiseFulfilledResult<number> => r.status === 'fulfilled'
    )
    .reduce((acc, r) => acc + (r.value || 0), 0)

  return { items: pagedItems, totalCount }
})
