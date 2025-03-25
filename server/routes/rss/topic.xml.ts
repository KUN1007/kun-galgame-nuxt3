import { useKunFeed } from '../_useI18nFeed'
import type { TopicRSS } from '@/types/api/rss'

export default defineEventHandler(async (event) => {
  const baseUrl = useRuntimeConfig().public.KUN_GALGAME_URL
  const feed = useKunFeed(baseUrl, 'topic')

  const topics = await $fetch<TopicRSS[]>(`/api/rss/topic`, { method: 'GET' })

  for (const topic of topics) {
    feed.addItem({
      link: `${baseUrl}/topic/${topic.tid}`,
      title: topic.name,
      date: new Date(topic.time),
      description: topic.description,
      author: [
        {
          name: topic.user.name,
          link: `${baseUrl}galgamer/${topic.user.uid}/info`
        }
      ]
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
