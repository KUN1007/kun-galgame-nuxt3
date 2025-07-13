import { useKunFeed } from '../_useI18nFeed'
import type { GalgameRSS } from '~/types/api/rss'

export default defineEventHandler(async (event) => {
  const baseUrl = useRuntimeConfig().public.KUN_GALGAME_URL
  const feed = useKunFeed(baseUrl, 'galgame')

  const galgames = await $fetch<GalgameRSS[]>(`/api/rss/galgame`, {
    method: 'GET'
  })

  for (const galgame of galgames) {
    feed.addItem({
      link: `${baseUrl}/galgame/${galgame.id}`,
      image: galgame.banner,
      title: galgame.name,
      date: new Date(galgame.created),
      description: galgame.description,
      author: [
        {
          name: galgame.user.name,
          link: `${baseUrl}galgamer/${galgame.user.id}/info`
        }
      ]
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
