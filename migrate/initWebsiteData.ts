import { PrismaClient } from '@prisma/client'
import { friendArray } from '~/config/friend'
import { KUN_WEBSITE_CATEGORY_MAP } from '~/constants/website'

const prisma = new PrismaClient()

export const KUN_WEBSITE_TAG_MAP: Record<string, string> = {
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

  // resource > 5
  update0: '每日更新',
  update1: '每周更新',
  update2: '每月更新',
  update3: '更新缓慢 / 停滞',

  storage0: '自建存储',
  storage1: '不限速下载方式 / 种子',
  storage2: '网盘下载',
  storage3: '网赚盘',

  support0: '失效资源快速补档',
  support1: '有补档机制，但响应慢',
  support2: '无人维护，失效链接多',

  // <10%
  trash_storage0: '无网赚盘',
  // > 30%
  trash_storage1: '有少量网赚盘',
  // >50%
  trash_storage2: '有大量网赚盘',

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

  // recommend, professional articles, high-quality comment
  curation0: '精选推荐',
  // community ranking, tags
  curation1: '社区评分/标签',
  // only categorize
  curation2: '仅简单分类',
  // mess
  curation3: '内容杂乱无章',

  // perfectly compatible mobile (same functionality, perfect display)
  mobile0: '移动端完美适配',
  mobile1: '移动版体验一般',
  mobile2: '移动端体验差',

  // multi-factors(tags, producers) search, ai-powered search
  search0: '高级搜索',
  // only title / description / alias
  search1: '基本搜索',
  search2: '搜索功能差',

  // no abusing or other unmoe behaviors
  vibe0: '氛围友好',
  vibe1: '氛围一般',
  vibe2: '氛围较差',

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

  // modern web tech-stack / 2FA
  security0: '安全性高',
  // https / WordPress
  security1: '基础安全',
  // harmful app / scripts
  security2: '存在安全风险',

  patch: '补丁站',
  // Powered by OpenList / Alist or other cloud-storage program
  cloud: '网盘站',
  // Impl CFMSC or other wiki-like features
  wiki: '百科站',
  localization: '汉化资源为主',
  raw: '生肉资源为主',
  // information website
  info: '不提供本体资源下载'
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

export const KUN_TAG_DESCRIPTIONS: Record<string, string> = {
  // 广告程度 (ad)
  ad0: '网站在正常浏览和下载流程中, 完全不包含任何形式的广告, 如弹窗、横幅、或伪装成下载按钮的广告。',
  ad1: '页面中存在少量 (通常少于3个) 不影响核心体验的广告, 如侧边栏或页脚的非侵入式横幅广告。',
  ad2: '页面中存在一定数量 (通常3到6个) 的广告, 或包含可能轻微干扰用户操作的广告 (如文章内广告) 。',
  ad3: '页面广告数量较多 (通常超过6个) , 或包含弹窗、遮挡内容、欺骗性点击等严重影响浏览和下载体验的广告。',

  // 开源情况 (open)
  open0:
    '网站的全部核心代码 (前端与后端) 均在 GitHub 等平台公开, 并采用明确的开源许可证。',
  open1:
    '网站的部分组件或代码开源 (如前端界面、某个独立工具, 且开源代码比例高于 50%) , 但核心后端或关键功能不开源。',
  open2: '网站未公开任何源代码, 或无法找到其公开的代码仓库。',

  // 资源数量 (resource)
  resource0:
    '网站收录的游戏资源总数 (或可明确统计的 Galgame 项目数) 超过 10,000 个。',
  resource1:
    '网站收录的游戏资源总数 (或可明确统计的 Galgame 项目数) 在 5,000 到 10,000 个之间。',
  resource2:
    '网站收录的游戏资源总数 (或可明确统计的 Galgame 项目数) 在 2,000 到 5,000 个之间。',
  resource3:
    '网站收录的游戏资源总数 (或可明确统计的 Galgame 项目数) 少于 2,000 个。',

  // 资源更新频率 (update)
  update0:
    '在活跃期内, 平均每个工作日都能发布或更新游戏资源 (非用户评论和话题) 。',
  update1: '网站能保持每周至少更新一次新资源的频率 (非用户评论和话题) 。',
  update2: '网站能保持每月至少更新一次新资源的频率 (非用户评论和话题) 。',
  update3: '网站超过一个月未发布新资源, 或已明确公告停止更新。',

  // 下载方式 (storage)
  storage0:
    '网站主要 (>80%资源) 使用自建服务器或自有对象存储提供直接下载, 通常速度快且稳定。',
  storage1:
    '主要提供 BT 种子、磁力链接, 或无需登录、不强制限速的第三方云盘 (如 Mega, GoFile) 作为下载方式。',
  storage2:
    '主要使用需要客户端或可能有限速的主流网盘 (如百度网盘、阿里云盘、夸克网盘) 作为下载方式。',
  storage3:
    '主要 (或大量) 使用通过下载量变现的网盘 (如城通网盘、飞猫云盘、迅牛云盘) , 通常下载体验差、广告多、速度极慢。',

  // 补档速度 (support)
  support0:
    '网站设有专门的补档请求区 (或其它手段用户直接反馈通知发布人资源失效), 且管理员或发布者通常能在短时间 (72小时内) 响应并修复失效链接。',
  support1:
    '网站有补档渠道 (如评论区反馈) , 但处理速度较慢, 或修复成功率不高。',
  support2:
    '网站内存在大量失效链接, 且没有有效的反馈或修复机制, 用户反馈长期被忽略。',

  // 网赚盘比例 (trash_storage)
  trash_storage0:
    '网站几乎不使用网赚盘, 或其占比极低 (低于10%) , 用户在正常使用中几乎不会遇到。',
  trash_storage1:
    '网站中包含一部分网赚盘链接 (占比10%-50%) , 但并非主要的或唯一的下载方式。',
  trash_storage2:
    '网站主要 (占比超过50%) 依赖网赚盘提供下载, 用户下载资源时极大概率会遇到。',

  // 网站年龄 (age)
  age0: '网站从首次可追溯的上线日期至今, 已持续运营超过20年。',
  age1: '网站从首次可追溯的上线日期至今, 已持续运营10到20年。',
  age2: '网站从首次可追溯的上线日期至今, 已持续运营5到10年。',
  age3: '网站从首次可追溯的上线日期至今, 已持续运营3到5年。',
  age4: '网站从首次可追溯的上线日期至今, 已持续运营1到3年。',
  age5: '网站运营时间不足1年, 或无法追溯其历史。',

  // 访问门槛 (threshold)
  threshold0: '所有资源无需注册、登录或任何前置条件即可直接访问和下载。',
  threshold1: '需要注册并登录账号才能查看或下载资源。',
  threshold2:
    '在登录的基础上, 还需要在帖子中进行回复 (如“回复可见”) 才能获取下载链接。',
  threshold3:
    '在登录的基础上, 还需要消耗通过签到、发帖等方式获取的积分、金币等虚拟货币才能下载。',
  threshold4:
    '获取资源的条件非常苛刻, 如需要高等级用户组、邀请码注册或完成复杂任务 (付费网站不收录, 付费网站在本站严格禁止)。',

  // 内容介绍 (intro)
  intro0:
    '游戏总览页面有预览图, 以及每个游戏详情页面都提供非常详尽的介绍, 包括多张高清CG预览、故事梗概、角色介绍、制作公司、声优、游戏时长等结构化信息。',
  intro1:
    '游戏总览页面有预览图, 以及每个游戏详情页面提供较多的介绍信息, 如故事梗概和几张游戏截图, 以及其它标签、发布时间等杂项。',
  intro2:
    '游戏总览页面有预览图, 以及每个游戏详情页面仅提供基础信息, 如游戏标题和下载链接, 可能附带一张封面图。',
  intro3:
    '游戏总览页面没有预览图, 以及每个游戏详情页面少量或完全没有游戏相关的介绍或预览图, 只有标题和下载链接。',

  // 内容筛选与整理 (curation)
  curation0:
    '网站有高质量的编辑推荐、专题文章或深度评测, 能有效帮助用户发现优秀作品。',
  curation1:
    '网站提供基于社区的评分、排名系统或详尽的标签系统, 用户可以自行筛选和发现内容。',
  curation2:
    '内容仅按厂商、年份等基础方式进行分类, 缺乏进一步的筛选和推荐机制。',
  curation3: '内容堆砌, 分类混乱, 缺乏有效的组织, 用户难以找到想要的内容。',

  // 移动端适配 (mobile)
  mobile0:
    '网站采用响应式设计或有独立的移动版, 在移动设备上显示完美, 所有功能均可正常使用。',
  mobile1: '网站有移动端视图, 但存在部分显示错位、功能缺失或操作不便的问题。',
  mobile2:
    '网站为纯桌面版设计, 在移动设备上浏览时需要手动缩放和平移, 体验极差。',

  // 搜索支持 (search)
  search0:
    '提供强大的高级搜索功能, 支持按标签、厂商、声优、发售日期等多维度组合筛选, 或支持现代 LLM 赋能的搜索。',
  search1: '提供基本的搜索框, 仅能根据游戏标题、别名或简介进行关键词搜索。',
  search2:
    '网站没有搜索功能, 或搜索功能基本无效 (如搜索结果不准确、无法使用) 。',

  // 网站氛围 (vibe)
  vibe0: '社区 (评论区、论坛) 氛围友好, 用户交流积极正面, 乐于助人, 管理有效。',
  vibe1: '社区氛围一般, 存在少量争吵、伸手党, 存在无意义的水贴, 但整体可控。',
  vibe2: '社区氛围较差, 充斥着攻击性言论、引战或广告, 缺乏有效管理。',

  // 社区活跃度 (active)
  active0: '社区极为活跃, 每日新增主题帖/评论超过 300 条 (非打卡、水贴)。',
  active1: '社区活跃, 每日新增主题帖/评论在 100 到 300 条之间 (非打卡、水贴)。',
  active2:
    '社区比较活跃, 每日新增主题帖/评论在 50 到 100 条之间 (非打卡、水贴)。',
  active3:
    '社区活跃度一般, 每日新增主题帖/评论在 10 到 50 条之间 (非打卡、水贴)。',
  active4: '社区较为冷清, 每日新增主题帖/评论少于 10 条 (非打卡、水贴)。',

  // 网站性能 (performance)
  performance0:
    '网站访问速度极快, 网站主页在 3 秒内加载完成, 页面平均切换速度 < 2s。',
  performance2:
    '网站访问速度快, 网站主页在 3 到 6 秒内加载完成, 页面平均切换速度 < 2.5s。',
  performance3:
    '网站访问速度一般, 网站主页在 6 到 9 秒内加载完成, 页面平均切换速度 < 3s。',
  performance4:
    '网站访问速度较慢, 加载时间超过 12 秒, 或频繁出现无法访问的情况。',

  // 网站安全性 (security)
  security0:
    '网站采用现代化的安全实践, 如全站 HTTPS 、内容安全策略 (CSP)、支持双因素认证 (2FA) 等, 采用现代 Web 框架 (如 React / Remix, Vue / Nuxt 等) 编写。',
  security1:
    '网站提供基础的 HTTPS 加密, 但可能存在混合内容警告或使用老旧的网站程序 (如 WordPress, Discuz) 。',
  security2:
    '网站存在明显安全风险, 如使用HTTP、包含恶意脚本、强制下载不明程序或证书无效。',

  // 网站类型 (misc)
  patch:
    '网站主要提供游戏汉化补丁、全 CG 存档、AI 翻译补丁、修正补丁等补丁资源, 而非游戏本体。',
  cloud:
    '网站基于 Alist / OpenList 等程序聚合展示的个人或公共网盘资源列表, 所有资源均以资源列表形式展示。',
  wiki: '网站以提供游戏资料、攻略、CG鉴赏等百科信息为主, 类似数据库或维基站点。',
  localization: '网站收录的资源中, 官方中文或社区汉化版游戏占比超过 70%。',
  raw: '网站收录的资源中, 日文原版或其他非中文版游戏 (生肉) 占比超过 70%。',
  info: '网站仅提供游戏介绍、新闻、评测等信息, 不直接提供游戏本体下载 (可能引导至 Steam 等正版平台) 。'
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
      data: Object.keys(KUN_WEBSITE_CATEGORY_MAP).map((c) => ({
        name: c,
        label: KUN_WEBSITE_CATEGORY_MAP[c]
      }))
    })

    await prisma.galgame_website_tag.createMany({
      data: Object.keys(KUN_WEBSITE_TAG_LEVEL_MAP).map((k) => ({
        name: k,
        label: KUN_WEBSITE_TAG_MAP[k],
        level: KUN_WEBSITE_TAG_LEVEL_MAP[k],
        description: KUN_TAG_DESCRIPTIONS[k]
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

// const i = async () => {
//   const tagData = await prisma.galgame_website_tag.findMany({
//     select: { name: true }
//   })

//   await Promise.all(
//     tagData.map(async (t) => {
//       await prisma.galgame_website_tag.update({
//         where: { name: t.name },
//         data: { label: KUN_WEBSITE_TAG_MAP[t.name] }
//       })
//     })
//   )

//   const catData = await prisma.galgame_website_category.findMany({
//     select: { name: true }
//   })

//   await Promise.all(
//     catData.map(async (t) => {
//       await prisma.galgame_website_category.update({
//         where: { name: t.name },
//         data: { label: KUN_WEBSITE_CATEGORY_MAP[t.name] }
//       })
//     })
//   )
// }

// i()
