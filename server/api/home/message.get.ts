import prisma from '~/prisma/prisma'
import { getPreferredLanguageText } from '~/utils/getPreferredLanguageText'
import { markdownToText } from '~/utils/markdownToText'
import type { ActivityItem } from '~/types/api/activity'

const ACTIVITY_ITEM_FETCHER_LIMIT = 5
const ACTIVITY_ITEM_LIMIT = 23

const timelineFetchers = {
  GALGAME_CREATION: async (content_limit?: string): Promise<ActivityItem[]> => {
    const items = await prisma.galgame.findMany({
      where: { content_limit },
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
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
    return items.map((item) => ({
      uniqueId: `galgame-${item.id}`,
      type: 'GALGAME_CREATION',
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
  },

  GALGAME_COMMENT_CREATION: async () => {
    const items = await prisma.galgame_comment.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        content: true,
        created: true,
        user: { select: { id: true, name: true, avatar: true } },
        galgame: { select: { id: true, name_zh_cn: true, name_en_us: true } }
      }
    })
    return items.map((item) => ({
      uniqueId: `galgame-comment-${item.id}`,
      type: 'GALGAME_COMMENT_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/galgame/${item.galgame.id}`,
      content: item.content.slice(0, 100)
    })) satisfies ActivityItem[]
  },

  GALGAME_PR_CREATION: async () => {
    const items = await prisma.galgame_pr.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        created: true,
        new_data: true,
        user: { select: { id: true, name: true, avatar: true } },
        galgame: {
          select: { id: true }
        }
      }
    })
    return items.map((item) => ({
      uniqueId: `galgame-pr-${item.id}`,
      type: 'GALGAME_PR_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/galgame/${item.galgame.id}`,
      content: Object.values(item.new_data || {})
        .join('')
        .slice(0, 100)
    })) satisfies ActivityItem[]
  },

  TOPIC_CREATION: async (content_limit?: string) => {
    const items = await prisma.topic.findMany({
      where: { status: { not: 1 }, ...(content_limit === 'sfw' ? { is_nsfw: false } : {}) },
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        title: true,
        created: true,
        user: { select: { id: true, name: true, avatar: true } }
      }
    })
    return items.map((item) => ({
      uniqueId: `topic-${item.id}`,
      type: 'TOPIC_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/topic/${item.id}`,
      content: item.title
    })) satisfies ActivityItem[]
  },

  TOPIC_REPLY_CREATION: async (content_limit?: string) => {
    const items = await prisma.topic_reply.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        topic_id: true,
        content: true,
        created: true,
        user: { select: { id: true, name: true, avatar: true } },
        target: { select: { content: true } }
      },
      where: content_limit === 'sfw' ? { topic: { is_nsfw: false } } : undefined
    })
    return items.map((item) => ({
      uniqueId: `topic-reply-${item.id}`,
      type: 'TOPIC_REPLY_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/topic/${item.topic_id}`,
      content:
        `${markdownToText(item.content)}${(item.target ?? []).map((t) => markdownToText(t.content)).join('')}`.slice(
          0,
          100
        )
    })) satisfies ActivityItem[]
  },

  UPDATE_LOG_CREATION: async () => {
    const items = await prisma.update_log.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: { id: true, version: true, content_zh_cn: true, created: true }
    })
    return items.map((item) => ({
      uniqueId: `update-log-${item.id}`,
      type: 'UPDATE_LOG_CREATION',
      timestamp: item.created,
      actor: null,
      link: `/update/history`,
      content: item.content_zh_cn
    })) satisfies ActivityItem[]
  },

  MESSAGE_SOLUTION: async () => {
    const items = await prisma.message.findMany({
      where: { type: 'solution' },
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        type: true,
        content: true,
        link: true,
        created: true,
        sender: { select: { id: true, name: true, avatar: true } }
      }
    })
    return items.map((item) => ({
      uniqueId: `message-${item.id}`,
      type: 'MESSAGE_SOLUTION',
      timestamp: item.created,
      actor: item.sender,
      link: item.link,
      content: item.content.slice(0, 100)
    })) satisfies ActivityItem[]
  },
  MESSAGE_UPVOTE: async () => {
    const items = await prisma.message.findMany({
      where: { type: 'upvoted' },
      orderBy: { created: 'desc' },
      select: {
        id: true,
        type: true,
        content: true,
        link: true,
        created: true,
        sender: { select: { id: true, name: true, avatar: true } }
      }
    })
    return items.map((item) => ({
      uniqueId: `message-${item.id}`,
      type: 'MESSAGE_UPVOTE',
      timestamp: item.created,
      actor: item.sender,
      link: item.link,
      content: markdownToText(item.content).slice(0, 100)
    })) satisfies ActivityItem[]
  },

  GALGAME_WEBSITE_CREATION: async () => {
    const items = await prisma.galgame_website.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: { id: true, url: true, name: true, created: true }
    })
    return items.map((item) => ({
      uniqueId: `galgame-website-${item.id}`,
      type: 'GALGAME_WEBSITE_CREATION',
      timestamp: item.created,
      actor: null,
      link: `/website/${item.url}`,
      content: `收录了新 Galgame 网站: ${item.name}`
    })) satisfies ActivityItem[]
  },
  GALGAME_WEBSITE_COMMENT_CREATION: async () => {
    const items = await prisma.galgame_website_comment.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        content: true,
        created: true,
        user: { select: { id: true, name: true, avatar: true } },
        website: { select: { url: true } }
      }
    })
    return items.map((item) => ({
      uniqueId: `galgame-website-comment-${item.id}`,
      type: 'GALGAME_WEBSITE_COMMENT_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/website/${item.website.url}`,
      content: item.content.substring(0, 100)
    })) satisfies ActivityItem[]
  },
  TOOLSET_COMMENT_CREATION: async () => {
    const items = await prisma.galgame_toolset_comment.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        content: true,
        created: true,
        user: { select: { id: true, name: true, avatar: true } },
        toolset_id: true
      }
    })
    return items.map((item) => ({
      uniqueId: `toolset-comment-${item.id}`,
      type: 'TOOLSET_COMMENT_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/toolset/${item.toolset_id}`,
      content: item.content.substring(0, 100)
    })) satisfies ActivityItem[]
  },
  GALGAME_RESOURCE_CREATION: async (content_limit?: string) => {
    const items = await prisma.galgame_resource.findMany({
      where: { galgame: { content_limit } },
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
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
    return items.map((item) => ({
      uniqueId: `galgame-resource-${item.id}`,
      type: 'GALGAME_RESOURCE_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/galgame/${item.galgame.id}`,
      content: `在《${getPreferredLanguageText({
        'en-us': item.galgame.name_en_us,
        'ja-jp': item.galgame.name_ja_jp,
        'zh-cn': item.galgame.name_zh_cn,
        'zh-tw': item.galgame.name_zh_tw
      })}》发布了下载资源`
    })) satisfies ActivityItem[]
  },
  TOPIC_COMMENT_CREATION: async (content_limit?: string) => {
    const items = await prisma.topic_comment.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        content: true,
        created: true,
        user: { select: { id: true, name: true, avatar: true } },
        topic_id: true
      },
      where: content_limit === 'sfw' ? { topic: { is_nsfw: false } } : undefined
    })
    return items.map((item) => ({
      uniqueId: `topic-comment-${item.id}`,
      type: 'TOPIC_COMMENT_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/topic/${item.topic_id}`,
      content: item.content.substring(0, 100)
    })) satisfies ActivityItem[]
  },
  TODO_CREATION: async () => {
    const items = await prisma.todo.findMany({
      orderBy: { created: 'desc' },
      take: ACTIVITY_ITEM_FETCHER_LIMIT,
      select: {
        id: true,
        created: true,
        content_en_us: true,
        content_ja_jp: true,
        content_zh_cn: true,
        content_zh_tw: true,
        user: { select: { id: true, name: true, avatar: true } }
      }
    })
    return items.map((item) => ({
      uniqueId: `todo-${item.id}`,
      type: 'TODO_CREATION',
      timestamp: item.created,
      actor: item.user,
      link: `/update/todo`,
      content: getPreferredLanguageText({
        'en-us': item.content_en_us,
        'ja-jp': item.content_ja_jp,
        'zh-cn': item.content_zh_cn,
        'zh-tw': item.content_zh_tw
      }).substring(0, 100)
    })) satisfies ActivityItem[]
  }
}

export default defineEventHandler(async (event) => {
  const nsfw = getNSFWCookie(event)
  const contentLimit = nsfw === 'sfw' ? 'sfw' : undefined

  const promises = Object.values(timelineFetchers).map((fetcher) =>
    fetcher(contentLimit)
  )
  const results = await Promise.allSettled(promises)

  const allActivities = results
    .filter(
      (result): result is PromiseFulfilledResult<ActivityItem[]> =>
        result.status === 'fulfilled'
    )

    .flatMap((result) => result.value)

  allActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const items = allActivities.slice(0, ACTIVITY_ITEM_LIMIT)

  return items
})
