import { useKunFeed } from '../_useI18nFeed'
import type { TopicRSS } from '~/types/api/rss'

export default defineEventHandler(async (event) => {
  const { locale }: { locale: 'en-us' | 'zh-cn' | undefined } =
    await getQuery(event)
  const language = locale ?? 'en-us'

  const baseUrl = useRuntimeConfig().public.KUN_GALGAME_URL
  const i18nUrl = `${baseUrl}/${language}`

  const feed = useKunFeed(baseUrl, language, 'topic')

  const topics = await $fetch<TopicRSS[]>(
    `/api/rss/topic?language=${language}`,
    { method: 'GET' }
  )

  for (const topic of topics) {
    feed.addItem({
      link: `${i18nUrl}/topic/${topic.tid}`,
      title: topic.name,
      date: new Date(topic.time),
      description: topic.description,
      author: [
        {
          name: topic.user.name,
          link: `${i18nUrl}galgamer/${topic.user.uid}/info`
        }
      ]
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
