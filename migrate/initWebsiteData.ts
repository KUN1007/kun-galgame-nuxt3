import { PrismaClient } from '@prisma/client'
import { friendArray } from '~/config/friend'

const prisma = new PrismaClient()

const KUN_WEBSITE_CATEGORY_MAP: Record<string, string> = {
  resource: '资源网站',
  community: '社区网站',
  telegram: 'Telegram 群组',
  other: '其它网站'
}

const KUN_WEBSITE_TAG_MAP: Record<string, string> = {
  ad0: '无广告',
  // <3
  ad1: '少量广告',
  // >3 & <6
  ad2: '有广告',
  // >6
  ad3: '广告较多',

  open0: '完全开源',
  open1: '部分开源',
  open2: '不开源',

  // >10000
  resource0: '资源超丰富',
  // >5000
  resource1: '资源较多',
  // >2000
  resource2: '资源数一般',
  // <1000
  resource3: '资源较少',

  trash_storage0: '自建存储',
  // <10%
  trash_storage1: '无网赚盘',
  // > 30%
  trash_storage2: '有网赚盘',
  // >50%
  trash_storage3: '大量网赚盘',

  age0: '存活 20 年+',
  age1: '存活 10 年+',
  age2: '存活 5 年+',
  age3: '存活 3 年+',
  age4: '存活 1 年+',
  age5: '新站',

  threshold0: '无门槛',
  threshold1: '需登录',
  threshold2: '需登录 + 回复',
  threshold3: '需登录 + 积分',
  threshold4: '获取资源难',

  intro0: '介绍非常详细',
  intro1: '介绍较多',
  intro2: '介绍一般',
  intro3: '无游戏介绍',

  // new create items > 300 / 1day
  active0: '社区超级活跃',
  // > 100
  active1: '社区活跃',
  // > 50
  active2: '社区较活跃',
  // > 10
  active3: '活跃度一般',
  // < 10
  active4: '社区较冷',

  // first-content load complete < 3s, based on SSR App, SPA -3s
  performance0: '网站速度极快',
  // <6s
  performance2: '网站加载快',
  // <9s
  performance3: '网站速度一般',
  // >12s
  performance4: '网站速度较慢',

  patch: '补丁站',
  // Powered by OpenList / Alist or other cloud-storage program
  cloud: '网盘站',
  // Impl CFMSC or other wiki-like features
  wiki: '百科站'
}

const KUN_WEBSITE_TAG_LEVEL_MAP: Record<string, number> = {
  ad0: 20,
  // <3
  ad1: 10,
  // >3 & <6
  ad2: 0,
  // >6
  ad3: -10,

  open0: 10,
  open1: 5,
  open2: 0,

  // >10000
  resource0: 20,
  // >5000
  resource1: 10,
  // >2000
  resource2: 5,
  // <1000
  resource3: 0,

  trash_storage0: 20,
  // <10%
  trash_storage1: 10,
  // > 30%
  trash_storage2: 0,
  // >50%
  trash_storage3: -10,

  age0: 20,
  age1: 10,
  age2: 5,
  age3: 3,
  age4: 1,
  age5: 0,

  threshold0: 20,
  threshold1: 10,
  threshold2: 5,
  threshold3: 0,
  threshold4: -10,

  intro0: 10,
  intro1: 5,
  intro2: 0,
  intro3: -5,

  // new create items > 300 / 1day
  active0: 20,
  // > 100
  active1: 10,
  // > 50
  active2: 5,
  // > 10
  active3: 0,
  // < 10
  active4: -5,

  // first-content load complete < 3s, based on SSR App, SPA -3s
  performance0: 20,
  // <6s
  performance2: 10,
  // <9s
  performance3: 0,
  // >12s
  performance4: -5,

  patch: 0,
  // Powered by OpenList / Alist or other cloud-storage program
  cloud: 0,
  // Impl CFMSC or other wiki-like features
  wiki: 0
}

const getDomain = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname
  } catch (error) {
    return ''
  }
}

const initWebsiteData = async () => {
  return await prisma.$transaction(async (prisma) => {
    await prisma.galgame_website_category.createMany({
      data: Object.keys(KUN_WEBSITE_CATEGORY_MAP).map((c) => ({ name: c }))
    })

    await prisma.galgame_website_tag.createMany({
      data: Object.keys(KUN_WEBSITE_TAG_MAP).map((k) => ({
        name: k,
        level: KUN_WEBSITE_TAG_LEVEL_MAP[k]
      }))
    })

    const testTagData = [1, 4, 8, 12, 16, 20, 24]

    const websiteArr = friendArray.map((f) => f.value).flat()
    await prisma.galgame_website.createMany({
      data: websiteArr.map((w) => ({
        url: getDomain(w.link),
        name: w.name,
        create_time: new Date(),
        description: w.label,
        icon: '/favicon.webp',
        language: 'zh-cn',
        age_limit: 'all',
        domain: [w.link],
        category_id: 1
      }))
    })

    await Promise.all(
      websiteArr.map(async (website, index) => {
        const dataToCreate = testTagData.map((i) => ({
          galgame_website_id: index,
          galgame_website_tag_id: i
        }))
        await prisma.galgame_website_tag_relation.createMany({
          data: dataToCreate,
          skipDuplicates: true
        })
      })
    )
  })
}

initWebsiteData()
