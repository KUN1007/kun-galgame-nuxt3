import prisma from '~/prisma/prisma'
import { getPreferredLanguageText } from '~/utils/getPreferredLanguageText'
import { markdownToText } from '~/utils/markdownToText'
import { getActivitySchema } from '~/validations/activity'
import type { ActivityItem, ActivityEventType } from '~/types/api/activity'

type ActivityFetcher = (
  limit: number,
  skip: number
) => Promise<{
  items: ActivityItem[]
  total: number
}>

const activityFetchers: Record<ActivityEventType, ActivityFetcher> = {
  GALGAME_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.galgame.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          name_en_us: true,
          name_ja_jp: true,
          name_zh_cn: true,
          name_zh_tw: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } }
        }
      }),
      prisma.galgame.count()
    ])
    return {
      items: items.map((item) => ({
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
      })) satisfies ActivityItem[],
      total
    }
  },
  GALGAME_COMMENT_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.galgame_comment.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          galgame: { select: { id: true, name_zh_cn: true, name_en_us: true } }
        }
      }),
      prisma.galgame_comment.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `galgame-comment-${item.id}`,
        type: 'GALGAME_COMMENT_CREATION',
        timestamp: item.created,
        actor: item.user,
        link: `/galgame/${item.galgame.id}`,
        content: item.content.slice(0, 100)
      })) satisfies ActivityItem[],
      total
    }
  },
  GALGAME_PR_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.galgame_pr.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          created: true,
          new_data: true,
          user: { select: { id: true, name: true, avatar: true } },
          galgame: {
            select: { id: true }
          }
        }
      }),
      prisma.galgame_pr.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `galgame-pr-${item.id}`,
        type: 'GALGAME_PR_CREATION',
        timestamp: item.created,
        actor: item.user,
        link: `/galgame/${item.galgame.id}`,
        content: Object.values(item.new_data || {})
          .join('')
          .slice(0, 100)
      })) satisfies ActivityItem[],
      total
    }
  },
  TOPIC_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.topic.findMany({
        where: { status: { not: 1 } },
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          title: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } }
        }
      }),
      prisma.topic.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `topic-${item.id}`,
        type: 'TOPIC_CREATION',
        timestamp: item.created,
        actor: item.user,
        link: `/topic/${item.id}`,
        content: item.title
      })) satisfies ActivityItem[],
      total
    }
  },
  TOPIC_REPLY_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.topic_reply.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          topic_id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          target: { select: { content: true } }
        }
      }),
      prisma.topic_reply.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `topic-reply-${item.id}`,
        type: 'TOPIC_REPLY_CREATION',
        timestamp: item.created,
        actor: item.user,
        link: `/topic/${item.topic_id}`,
        content:
          `${markdownToText(item.content)}${item.target.map((t) => markdownToText(t.content)).join('')}`.slice(
            0,
            100
          )
      })) satisfies ActivityItem[],
      total
    }
  },
  UPDATE_LOG_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.update_log.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: { id: true, version: true, created: true, content_zh_cn: true }
      }),
      prisma.update_log.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `update-log-${item.id}`,
        type: 'UPDATE_LOG_CREATION',
        timestamp: item.created,
        actor: null,
        link: `/update/history`,
        content: item.content_zh_cn
      })) satisfies ActivityItem[],
      total
    }
  },
  MESSAGE_SOLUTION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.message.findMany({
        where: { type: 'solution' },
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          type: true,
          content: true,
          link: true,
          created: true,
          sender: { select: { id: true, name: true, avatar: true } }
        }
      }),
      prisma.message.count({ where: { type: 'solution' } })
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `message-${item.id}`,
        type: 'MESSAGE_SOLUTION',
        timestamp: item.created,
        actor: item.sender,
        link: item.link,
        content: item.content.slice(0, 100)
      })) satisfies ActivityItem[],
      total
    }
  },
  MESSAGE_UPVOTE: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.message.findMany({
        where: { type: 'upvoted' },
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          type: true,
          content: true,
          link: true,
          created: true,
          sender: { select: { id: true, name: true, avatar: true } }
        }
      }),
      prisma.message.count({ where: { type: 'upvoted' } })
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `message-${item.id}`,
        type: 'MESSAGE_UPVOTE',
        timestamp: item.created,
        actor: item.sender,
        link: item.link,
        content: markdownToText(item.content).slice(0, 100)
      })) satisfies ActivityItem[],
      total
    }
  },

  GALGAME_WEBSITE_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.galgame_website.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: { id: true, url: true, name: true, created: true }
      }),
      prisma.galgame_website.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `galgame-website-${item.id}`,
        type: 'GALGAME_WEBSITE_CREATION',
        timestamp: item.created,
        actor: null,
        link: `/website/${item.url}`,
        content: `收录了新 Galgame 网站: ${item.name}`
      })) satisfies ActivityItem[],
      total
    }
  },
  GALGAME_WEBSITE_COMMENT_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.galgame_website_comment.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          website: { select: { url: true } }
        }
      }),
      prisma.galgame_website_comment.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `galgame-website-comment-${item.id}`,
        type: 'GALGAME_WEBSITE_COMMENT_CREATION',
        timestamp: item.created,
        actor: item.user,
        link: `/website/${item.website.url}`,
        content: item.content.substring(0, 100)
      })) satisfies ActivityItem[],
      total
    }
  },
  GALGAME_RESOURCE_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.galgame_resource.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
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
      }),
      prisma.galgame_resource.count()
    ])
    return {
      items: items.map((item) => ({
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
      })) satisfies ActivityItem[],
      total
    }
  },
  TOPIC_COMMENT_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.topic_comment.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          content: true,
          created: true,
          user: { select: { id: true, name: true, avatar: true } },
          topic_id: true
        }
      }),
      prisma.topic_comment.count()
    ])
    return {
      items: items.map((item) => ({
        uniqueId: `topic-comment-${item.id}`,
        type: 'TOPIC_COMMENT_CREATION',
        timestamp: item.created,
        actor: item.user,
        link: `/topic/${item.topic_id}`,
        content: item.content.substring(0, 100)
      })) satisfies ActivityItem[],
      total
    }
  },
  TODO_CREATION: async (limit, skip) => {
    const [items, total] = await prisma.$transaction([
      prisma.todo.findMany({
        orderBy: { created: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          created: true,
          content_en_us: true,
          content_ja_jp: true,
          content_zh_cn: true,
          content_zh_tw: true,
          user: { select: { id: true, name: true, avatar: true } }
        }
      }),
      prisma.todo.count()
    ])
    return {
      items: items.map((item) => ({
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
      })) satisfies ActivityItem[],
      total
    }
  }
}

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getActivitySchema)
  if (typeof input === 'string') {
    return kunError(event, input, 400)
  }
  const { page, limit, type } = input

  const skip = (page - 1) * limit

  const fetcher = activityFetchers[type]
  const { items, total } = await fetcher(limit, skip)

  return { items, totalCount: total }
})
