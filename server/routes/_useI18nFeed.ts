import { Feed } from 'feed'

interface KunRSSContent {
  title: string
  description: string
  generator: string
  copyright: string
}

const contentMap: Record<'topic' | 'galgame', KunRSSContent> = {
  topic: {
    title: '鯤 Galgame 論壇 - 新話題訂閱',
    description: '最新更新關於 Galgame 的話題',
    generator: '萌萌 RSS 生成器',
    copyright: `版權所有 © 2024 鯤 Galgame 保留所有權利`
  },
  galgame: {
    title: '鯤 Galgame 論壇 - 新 Galgame 訂閱',
    description: '最新更新的 Galgame',
    generator: '萌萌 RSS 生成器',
    copyright: `版權所有 © 2024 鯤 Galgame 保留所有權利`
  }
}

export const useKunFeed = (baseUrl: string, link: 'galgame' | 'topic') => {
  const rss = `${baseUrl}/rss/${link}.xml`
  const feedContent = contentMap[link]
  const feed = new Feed({
    ...feedContent,
    id: baseUrl,
    link: baseUrl,
    image: `${baseUrl}/kungalgame.webp`,
    favicon: `${baseUrl}/favicon.ico`,
    feedLinks: {
      rss
    }
  })

  return feed
}
