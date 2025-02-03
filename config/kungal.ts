import type { KunSiteConfig } from './config'

const KUN_SITE_NAME = '鲲 Galgame 论坛'
const KUN_SITE_MENTION = '@kungalgame'
const KUN_SITE_TITLE = '鲲 Galgame 论坛 - 开源 Galgame 网站'
const KUN_SITE_DESCRIPTION =
  '世界上最萌的 Galgame 论坛! 世界上最先进的 Galgame 资源发布网站! 永远不会有广告! 永远免费! Galgame 下载, Galgame 资源网站'
const KUN_SITE_URL = 'https://www.kungal.com'
const KUN_SITE_URL_BACKUP = 'https://www.kungal.org'
const KUN_SITE_NAV = 'https://nav.kungal.org'
const KUN_SITE_PATCH = 'https://www.moyu.moe'
const KUN_SITE_STICKER = 'https://www.moyu.moe'
const KUN_SITE_DEVELOPMENT_DOCUMENTATION =
  'https://soft.moe/kun-visualnovel-docs/kun-forum.html'
const KUN_SITE_TELEGRAM_GROUP = 'https://t.me/kungalgame'
const KUN_SITE_GITHUB = 'https://github.com/KUN1007/kun-galgame-nuxt3'
const KUN_SITE_AUTHOR_GITHUB = 'https://github.com/KUN1007'
const KUN_SITE_LIST = [
  { name: '鲲 Galgame 导航', url: KUN_SITE_NAV },
  { name: '鲲 Galgame 补丁', url: KUN_SITE_PATCH },
  { name: '鲲 Galgame 表情包', url: KUN_SITE_STICKER },
  { name: '鲲 Galgame 论坛 (备用)', url: KUN_SITE_URL_BACKUP },
  { name: '鲲 Galgame 开发文档', url: KUN_SITE_DEVELOPMENT_DOCUMENTATION }
]
const KUN_SITE_THEME_COLOR = '#006FEE'

const KUN_SITE_KEYWORDS = [
  'Galgame',
  'Galgame 论坛',
  'Galgame 下载',
  'Galgame 资源',
  'Galgame wiki',
  'Galgame 评测',
  'Galgame 数据分析',
  'Galgame 新作动态',
  'Galgame 汉化 / 国际化',
  'Galgame 制作',
  'Galgame 讨论',
  'Galgame 制作',
  '技术交流',
  '其他交流'
]

export const kungal: KunSiteConfig = {
  title: KUN_SITE_TITLE,
  titleShort: KUN_SITE_NAME,
  titleTemplate: '%s | 开源 Galgame 网站',
  description: KUN_SITE_DESCRIPTION,
  keywords: KUN_SITE_KEYWORDS,
  canonical: KUN_SITE_URL,
  themeColor: KUN_SITE_THEME_COLOR,
  github: KUN_SITE_GITHUB,
  authorGitHub: KUN_SITE_AUTHOR_GITHUB,
  author: [
    { name: KUN_SITE_TITLE, url: KUN_SITE_URL },
    { name: 'GitHub', url: KUN_SITE_GITHUB },
    ...KUN_SITE_LIST
  ],
  creator: {
    name: KUN_SITE_NAME,
    mention: KUN_SITE_MENTION,
    url: KUN_SITE_URL
  },
  publisher: {
    name: KUN_SITE_NAME,
    mention: KUN_SITE_MENTION,
    url: KUN_SITE_URL
  },
  domain: {
    main: KUN_SITE_URL,
    imageBed: 'https://img.kungal.com',
    storage: 'https://oss.kungal.com',
    telegram_group: KUN_SITE_TELEGRAM_GROUP,
    patch: KUN_SITE_PATCH,
    backup: KUN_SITE_URL_BACKUP,
    sticker: KUN_SITE_STICKER,
    nav: KUN_SITE_NAV,
    doc: KUN_SITE_DEVELOPMENT_DOCUMENTATION
  },
  og: {
    title: KUN_SITE_TITLE,
    description: KUN_SITE_DESCRIPTION,
    image: '/kungalgame.webp',
    url: KUN_SITE_URL
  },
  images: [
    {
      url: '/kungalgame.webp',
      width: 1000,
      height: 800,
      alt: KUN_SITE_TITLE
    }
  ]
}
