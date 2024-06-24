import { useKunFeed } from '../_useI18nFeed'
import type { GalgameRSS } from '~/types/api/rss'

export default defineEventHandler(async (event) => {
  const { locale }: { locale: 'en-us' | 'zh-cn' | undefined } =
    await getQuery(event)
  const language = locale ?? 'en-us'

  const baseUrl = useRuntimeConfig().public.KUN_GALGAME_URL
  const i18nUrl = `${baseUrl}/${language}`

  const feed = useKunFeed(baseUrl, language, 'galgame')

  const galgames = await $fetch<GalgameRSS[]>(
    `/api/rss/galgame?language=${language}`,
    { method: 'GET' }
  )

  for (const galgame of galgames) {
    feed.addItem({
      link: `${i18nUrl}/galgame/${galgame.gid}`,
      image: galgame.banner,
      title: galgame.name,
      date: new Date(galgame.time),
      description: galgame.description,
      author: [
        {
          name: galgame.user.name,
          link: `${i18nUrl}galgamer/${galgame.user.uid}/info`
        }
      ]
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
