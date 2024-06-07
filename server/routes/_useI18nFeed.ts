import { Feed } from 'feed'

interface I18nContent {
  title: string
  description: string
  generator: string
  copyright: string
}

export const useKunFeed = (
  baseUrl: string,
  language: 'en-us' | 'zh-cn',
  link: 'galgame' | 'topic'
) => {
  const i18nUrl = `${baseUrl}/${language}`
  const rss = `${i18nUrl}/rss/${link}.xml?locale=${language}`

  const topicContentEN = {
    title: 'KUN Visual Novel - New Topics RSS',
    description: 'News and updates about Topics',
    generator: 'Moe RSS generator',
    copyright: `Copyright © 2024 KUN Visual Novel All Rights Reserved`
  }

  const topicContentCN = {
    title: '鲲 Galgame 论坛 - 新话题订阅',
    description: '最新更新关于 Galgame 的话题',
    generator: '萌萌 RSS 生成器',
    copyright: `版权所有 © 2024 鲲 Galgame 保留所有权利`
  }

  const galgameContentEN = {
    title: 'KUN Visual Novel - New Visual Novel RSS',
    description: 'News and updates about Visual Novels',
    generator: 'Moe RSS generator',
    copyright: `Copyright © 2024 KUN Visual Novel All Rights Reserved`
  }

  const galgameContentCN = {
    title: '鲲 Galgame 论坛 - 新 Galgame 订阅',
    description: '最新更新的 Galgame',
    generator: '萌萌 RSS 生成器',
    copyright: `版权所有 © 2024 鲲 Galgame 保留所有权利`
  }

  let feedContent: I18nContent
  if (link === 'topic') {
    feedContent = language === 'zh-cn' ? topicContentCN : topicContentEN
  } else {
    feedContent = language === 'zh-cn' ? galgameContentCN : galgameContentEN
  }

  const feed = new Feed({
    ...feedContent,
    id: i18nUrl,
    link: i18nUrl,
    language,
    image: `${i18nUrl}/kungalgame.webp`,
    favicon: `${baseUrl}/favicon.ico`,
    feedLinks: {
      rss
    }
  })

  return feed
}
