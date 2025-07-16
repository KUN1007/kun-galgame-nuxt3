import { PrismaClient } from '@prisma/client'
import { friendArray } from '~/config/friend'

const prisma = new PrismaClient()

const KUN_WEBSITE_CATEGORY_MAP: Record<string, string> = {
  resource: '资源网站',
  community: '社区网站',
  telegram: 'Telegram 群组',
  other: '其它网站'
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

  update0: 15,
  update1: 10,
  update2: 5,
  update3: -5,

  storage0: 20,
  storage1: 10,
  storage2: 0,
  storage3: -10,

  support0: 15,
  support1: 5,
  support2: -10,

  trash_storage0: 20,
  // <10%
  trash_storage1: 0,
  // > 30%
  trash_storage2: -10,

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

  curation0: 15,
  curation1: 10,
  curation2: 0,
  curation3: -10,

  mobile0: 10,
  mobile1: 5,
  mobile2: 0,

  search0: 10,
  search1: 0,
  search2: -5,

  vibe0: 10,
  vibe1: 0,
  vibe2: -10,

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

  security0: 10,
  security1: 0,
  security2: -100,

  patch: 0,
  // Powered by OpenList / Alist or other cloud-storage program
  cloud: 0,
  // Impl CFMSC or other wiki-like features
  wiki: 0,
  localization: 0,
  raw: 0,
  // information website
  info: 0
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
      data: Object.keys(KUN_WEBSITE_TAG_LEVEL_MAP).map((k) => ({
        name: k,
        level: KUN_WEBSITE_TAG_LEVEL_MAP[k]
      })),
      skipDuplicates: true
    })

    const testTagData = [1, 4, 8, 12, 16, 20, 24]

    const websiteArr = friendArray.map((f) => f.value).flat()
    await prisma.galgame_website.createMany({
      data: websiteArr.map((w) => ({
        url: getDomain(w.link),
        name: w.name,
        create_time: '1 year ago',
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
