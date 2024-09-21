import { Feed } from 'feed'

interface I18nContent {
  title: string
  description: string
  generator: string
  copyright: string
}

const contentMap: Record<Language, Record<'topic' | 'galgame', I18nContent>> = {
  'en-us': {
    topic: {
      title: 'KUN Visual Novel Forum - New Topics RSS',
      description: 'News and updates about Topics',
      generator: 'Moe RSS generator',
      copyright: `Copyright © 2024 KUN Visual Novel All Rights Reserved`
    },
    galgame: {
      title: 'KUN Visual Novel Forum - New Visual Novel RSS',
      description: 'News and updates about Visual Novels',
      generator: 'Moe RSS generator',
      copyright: `Copyright © 2024 KUN Visual Novel All Rights Reserved`
    }
  },
  'ja-jp': {
    topic: {
      title: '鯤 ギャルゲーム - 新しいトピックRSS',
      description: 'トピックに関するニュースと更新情報',
      generator: '萌えRSSジェネレーター',
      copyright: `著作権 © 2024 KUN ギャルゲーム 全著作権所有`
    },
    galgame: {
      title: '鯤 ギャルゲーム - 新しいギャルゲームRSS',
      description: 'ギャルゲームに関するニュースと更新情報',
      generator: '萌えRSSジェネレーター',
      copyright: `著作権 © 2024 KUN ギャルゲーム 全著作権所有`
    }
  },
  'zh-cn': {
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
  },
  'zh-tw': {
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
}

export const useKunFeed = (
  baseUrl: string,
  language: Language,
  link: 'galgame' | 'topic'
) => {
  const i18nUrl = `${baseUrl}/${language}`
  const rss = `${i18nUrl}/rss/${link}.xml?locale=${language}`

  const feedContent = contentMap[language][link]

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
