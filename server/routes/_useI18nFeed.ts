import { Feed } from 'feed'

interface KunRSSContent {
  title: string
  description: string
  generator: string
  copyright: string
}

const contentMap: Record<'topic' | 'galgame', KunRSSContent> = {
  topic: {
    title: '鲲 Galgame 论坛 - 新话题订阅',
    description: '最新更新关于 Galgame 的话题',
    generator: '萌萌 RSS 生成器',
    copyright: `版权所有 © 2024 鲲 Galgame 保留所有权利`
  },
  galgame: {
    title: '鲲 Galgame 论坛 - 新 Galgame 订阅',
    description: '最新更新的 Galgame',
    generator: '萌萌 RSS 生成器',
    copyright: `版权所有 © 2024 鲲 Galgame 保留所有权利`
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
