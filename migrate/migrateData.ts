import { execSync } from 'child_process'
import mongoose from 'mongoose'
import { Prisma, PrismaClient } from '@prisma/client'
import readline from 'readline'
import dotenv from 'dotenv'
import { getPreferredLanguageText } from '~/utils/getPreferredLanguageText'
import ChatRoomModel from '~/server/models/chat-room'
import ChatMessageModel from '~/server/models/chat-message'
import CommentModel from '~/server/models/comment'
import GalgameCommentModel from '~/server/models/galgame-comment'
import GalgameHistoryModel from '~/server/models/galgame-history'
import GalgameLinkModel from '~/server/models/galgame-link'
import GalgamePRModel from '~/server/models/galgame-pr'
import GalgameResourceModel from '~/server/models/galgame-resource'
import GalgameModel from '~/server/models/galgame'
import MessageAdminModel from '~/server/models/message-admin'
import MessageModel from '~/server/models/message'
import NonMoeModel from '~/server/models/non-moe'
import ReplyModel from '~/server/models/reply'
import ReportModel from '~/server/models/report'
import TagModel from '~/server/models/tag'
import TopicModel from '~/server/models/topic'
import TodoModel from '~/server/models/todo'
import UpdateLogModel from '~/server/models/update-log'
import UserModel from '~/server/models/user'

import {
  KUN_TOPIC_CATEGORY_CONST,
  KUN_TOPIC_SECTION_CONST
} from '~/constants/topic'

// 加载环境变量
dotenv.config()

// --- 配置常量 ---
const MONGO_URI = process.env.MONGODB_URL
const BATCH_SIZE = 100 // 每次处理和插入的数据量

// --- 数据库客户端初始化 ---
const prisma = new PrismaClient({
  log: ['warn', 'error'] // 按需开启日志
})

// --- Mongoose Models 定义 (仅用于迁移脚本) ---
// 为了让脚本独立运行，我们在这里重新定义 Mongoose schemas 和 models。
// 注意：这只是为了类型提示和查询，实际的 schema 验证在源数据库中已经完成。
// 你也可以直接从你的项目中 import 这些 model，如果项目结构允许的话。

// --- 辅助函数 ---

/**
 * 将毫秒时间戳转换为 Date 对象，处理无效值
 * @param ms - 毫秒数
 * @returns Date 对象或 null
 */
function msToDate(ms: number | undefined | null): Date | null {
  if (ms === null || ms === undefined || ms === 0) {
    return null
  }
  return new Date(ms)
}

// Handles string dates from update_log or number timestamps
function flexibleToDate(d: number | string | undefined | null): Date | null {
  if (d === null || d === undefined) return null
  const date = new Date(d)
  return isNaN(date.getTime()) ? null : date
}

/**
 * 重置 PostgreSQL 表的自增序列
 * @param tableName - 表名
 * @param columnName - 主键列名 (通常是 'id')
 */
async function resetSequence(tableName: string, columnName: string = 'id') {
  try {
    const result = await prisma.$queryRawUnsafe<{ max: number }[]>(
      `SELECT MAX("${columnName}") as max FROM "${tableName}";`
    )
    const maxId = result[0]?.max || 0

    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${tableName}"', '${columnName}'), ${maxId + 1}, false);`
    )
    console.log(`  🔄 Sequence for "${tableName}" reset to ${maxId + 1}.`)
  } catch (e) {
    console.error(
      `  ❌ Failed to reset sequence for table "${tableName}". It might not exist or have a sequence. Error:`,
      e
    )
  }
}

/**
 * 交互式确认
 * @param question - 提问内容
 * @returns Promise<boolean>
 */
function askConfirmation(question: string): Promise<boolean> {
  // (Implementation from previous answer is unchanged)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'yes')
    })
  )
}

// --- 数据清理函数 ---

async function clearPostgresData() {
  console.log('\n🧹 Clearing existing data from PostgreSQL...')
  console.log('\n🧹 Clearing existing data from PostgreSQL using TRUNCATE...')

  // 1. 获取所有表的名称
  const tableNamesResult = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `

  const tableNames = tableNamesResult
    .map((t) => t.tablename)
    // _prisma_migrations 是 Prisma 自己用的表，不要清空
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"${name}"`) // 给表名加上双引号以处理特殊字符或大小写
    .join(', ')

  if (tableNames.length > 0) {
    // 2. 使用 TRUNCATE ... RESTART IDENTITY CASCADE 清空所有表
    // RESTART IDENTITY: 重置自增ID
    // CASCADE: 级联删除所有外键引用
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`
    )
  }

  console.log('✅ PostgreSQL data cleared.')
  console.log('✅ PostgreSQL data cleared.')
}

async function precacheLookups() {
  console.log('  🔍 Pre-caching all lookup tables...')

  // Galgame lookups
  // const allGalgames = await GalgameModel.find(
  //   {},
  //   { tags: 1, engine: 1, official: 1 }
  // ).lean()
  // const uniqueGalgameTags = new Set<string>()
  // const uniqueEngines = new Set<string>()
  // const uniqueOfficials = new Set<string>()
  // for (const game of allGalgames) {
  //   game.tags?.forEach((tag) => uniqueGalgameTags.add(tag))
  //   game.engine?.forEach((engine) => uniqueEngines.add(engine))
  //   game.official?.forEach((official) => uniqueOfficials.add(official))
  // }
  // const galgameTagUpserts = [...uniqueGalgameTags].map((name) =>
  //   prisma.galgame_tag.upsert({ where: { name }, update: {}, create: { name } })
  // )
  // const engineUpserts = [...uniqueEngines].map((name) =>
  //   prisma.galgame_engine.upsert({
  //     where: { name },
  //     update: {},
  //     create: { name }
  //   })
  // )
  // const officialUpserts = [...uniqueOfficials].map((name) =>
  //   prisma.galgame_official.upsert({
  //     where: { name },
  //     update: {},
  //     create: { name, url: '' }
  //   })
  // )

  // // Topic sections lookup
  // const allTopics = await TopicModel.find({}, { section: 1 }).lean()
  // const uniqueSections = new Set<string>()
  // for (const topic of allTopics) {
  //   topic.section?.forEach((sec) => uniqueSections.add(sec))
  // }
  // const sectionUpserts = ['galgame', 'technique', 'others'].map((name, index) =>
  //   prisma.topic_section.upsert({
  //     where: { id: index, name },
  //     update: {},
  //     create: { name }
  //   })
  // )

  await prisma.topic_section.createMany({
    data: KUN_TOPIC_SECTION_CONST.map((s) => ({ name: s }))
  })

  // Topic tags lookup (from TagModel)
  const allTopicTags = await TagModel.find({}).lean()
  const topicTagsByTid = new Map<number, string[]>()
  for (const tag of allTopicTags) {
    if (!topicTagsByTid.has(tag.tid)) {
      topicTagsByTid.set(tag.tid, [])
    }
    topicTagsByTid.get(tag.tid)!.push(tag.name)
  }

  // Execute all upserts in a single transaction
  // await prisma.$transaction([
  //   ...galgameTagUpserts,
  //   ...engineUpserts,
  //   ...officialUpserts,
  //   ...sectionUpserts
  // ])

  // Fetch created records to build in-memory maps
  // const [galgameTags, engines, officials, sections] = await Promise.all([
  //   prisma.galgame_tag.findMany(),
  //   prisma.galgame_engine.findMany(),
  //   prisma.galgame_official.findMany(),
  //   prisma.topic_section.findMany()
  // ])
  const sections = await prisma.topic_section.findMany()

  const cache = {
    // galgameTagMap: new Map(galgameTags.map((t) => [t.name, t.id])),
    // engineMap: new Map(engines.map((e) => [e.name, e.id])),
    // officialMap: new Map(officials.map((o) => [o.name, o.id])),
    sectionMap: new Map(sections.map((s) => [s.name, s.id])),
    topicTagsByTid: topicTagsByTid
  }

  console.log(
    // `  ✅ Cached ${cache.galgameTagMap.size} galgame tags, ${cache.engineMap.size} engines, ${cache.officialMap.size} officials, ${cache.sectionMap.size} sections, and tags for ${cache.topicTagsByTid.size} topics.`
    `  ✅ Cached tags for ${cache.topicTagsByTid.size} topics.`
  )
  return cache
}

async function migrateUsers() {
  console.log('\n🚀 Starting User migration...')
  const total = await UserModel.countDocuments()
  const cursor = UserModel.find().lean().cursor()
  let migratedCount = 0

  for await (const doc of cursor) {
    // We process users one by one due to the complexity of creating related records.
    // A transaction ensures atomicity for each user and their relations.
    try {
      await prisma.$transaction([
        prisma.user.create({
          data: {
            id: doc.uid,
            name: doc.name,
            email: doc.email,
            password: doc.password,
            ip: doc.ip ?? '',
            avatar: doc.avatar ?? '',
            role: doc.roles ?? 1,
            status: doc.status ?? 0,
            moemoepoint: doc.moemoepoint ?? 7,
            bio: doc.bio ?? '',
            daily_check_in: doc.daily_check_in ?? 0,
            daily_image_count: doc.daily_image_count ?? 0,
            created: doc.created,
            updated: doc.updated
          }
        })
        // Create relations
        // prisma.user_friend.createMany({
        //   data:
        //     doc.friend?.map((friendId) => ({
        //       user_id: doc.uid,
        //       friend_id: friendId
        //     })) ?? [],
        //   skipDuplicates: true
        // }),
        // prisma.user_follow.createMany({
        //   data:
        //     doc.follower?.map((followerId) => ({
        //       follower_id: followerId,
        //       followed_id: doc.uid
        //     })) ?? [],
        //   skipDuplicates: true
        // })
      ])
      migratedCount++
      if (migratedCount % BATCH_SIZE === 0) {
        console.log(`  ... Migrated ${migratedCount} of ${total} users.`)
      }
    } catch (e) {
      console.error(`  ❌ Failed to migrate user with uid ${doc.uid}:`, e)
    }
  }
  console.log(`✅ User migration complete. Total migrated: ${migratedCount}.`)
}

async function migrateTodos() {
  console.log('\n🚀 Starting Todo migration...')

  const total = await TodoModel.countDocuments()
  const cursor = TodoModel.find().lean().cursor()
  let migratedCount = 0
  let batch: Prisma.todoCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    batch.push({
      id: doc.todo_id,
      status: doc.status ?? 0,
      content_en_us: doc.content?.['en-us'] ?? '',
      content_ja_jp: doc.content?.['ja-jp'] ?? '',
      content_zh_cn: doc.content?.['zh-cn'] ?? '',
      content_zh_tw: doc.content?.['zh-tw'] ?? '',
      completed_time: msToDate(doc.completed_time),
      user_id: 2,
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.todo.createMany({ data: batch, skipDuplicates: true })
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} todos.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.todo.createMany({ data: batch, skipDuplicates: true })
    migratedCount += batch.length
  }
  console.log(`✅ Todo migration complete. Total migrated: ${migratedCount}.`)
}

async function migrateUpdateLogs() {
  console.log('\n🚀 Starting UpdateLog migration...')
  const total = await UpdateLogModel.countDocuments()
  const cursor = UpdateLogModel.find().lean().cursor()
  let migratedCount = 0
  let batch: Prisma.update_logCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    batch.push({
      id: doc.upid,
      type: doc.type,
      version: doc.version ?? '',
      content_en_us: doc.content?.['en-us'] ?? '',
      content_ja_jp: doc.content?.['ja-jp'] ?? '',
      content_zh_cn: doc.content?.['zh-cn'] ?? '',
      content_zh_tw: doc.content?.['zh-tw'] ?? '',
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.update_log.createMany({ data: batch, skipDuplicates: true })
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} update logs.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.update_log.createMany({ data: batch, skipDuplicates: true })
    migratedCount += batch.length
  }
  console.log(
    `✅ UpdateLog migration complete. Total migrated: ${migratedCount}.`
  )
}

async function migrateTopics(
  cache: Awaited<ReturnType<typeof precacheLookups>>
) {
  console.log('\n🚀 Starting Topic migration...')
  const total = await TopicModel.countDocuments()
  const cursor = TopicModel.find().lean().cursor()
  let migratedCount = 0
  let batch: Prisma.PrismaPromise<unknown>[] = []

  for await (const doc of cursor) {
    const createPayload: Prisma.topicCreateArgs = {
      data: {
        id: doc.tid,
        title: doc.title,
        content: doc.content ?? '',
        view: doc.views ?? 0,
        status: doc.status ?? 0,
        category: doc.category?.[0].toLocaleLowerCase() ?? 'uncategorized',
        tag: cache.topicTagsByTid.get(doc.tid) ?? doc.tags ?? [],
        status_update_time: msToDate(doc.time) ?? doc.updated, // Use upvote_time as status_update_time
        edited: msToDate(doc.edited),
        upvote_time: msToDate(doc.upvote_time),
        created: doc.created,
        updated: doc.updated,

        // user: { connect: { id: doc.uid } },
        user_id: doc.uid,

        section: {
          create:
            doc.section
              ?.map((name) => ({
                topic_section_id: cache.sectionMap.get(name)!
              }))
              .filter((s) => s.topic_section_id) ?? []
        },

        // create related records
        upvote: { create: doc.upvotes?.map((uid) => ({ user_id: uid })) ?? [] },
        like: { create: doc.likes?.map((uid) => ({ user_id: uid })) ?? [] },
        dislike: {
          create: doc.dislikes?.map((uid) => ({ user_id: uid })) ?? []
        },
        favorite: {
          create: doc.favorites?.map((uid) => ({ user_id: uid })) ?? []
        }
      }
    }

    batch.push(prisma.topic.create(createPayload))

    if (batch.length >= BATCH_SIZE) {
      await prisma.$transaction(batch)
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} topics.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.$transaction(batch)
    migratedCount += batch.length
  }
  console.log(`✅ Topic migration complete. Total migrated: ${migratedCount}.`)
}

async function migrateGalgameSeries(): Promise<Map<number, number>> {
  console.log('🚀 Pre-processing and migrating Galgame Series...')

  // 1. 获取所有相关的 Galgame
  const galgamesWithSeries = await GalgameModel.find({
    'series.0': { $exists: true }
  })
    .select('gid name series')
    .lean()

  if (galgamesWithSeries.length === 0) {
    console.log('No series data found to migrate.')
    return new Map()
  }

  const nameMap = new Map<number, string>(
    galgamesWithSeries.map((g) => [
      g.gid,
      getPreferredLanguageText(g.name) || String(g.gid)
    ])
  )

  // 2. 使用并查集 (DSU) 进行分组
  const parent = new Map<number, number>()

  function find(i: number): number {
    if (!parent.has(i)) parent.set(i, i)
    if (parent.get(i)! === i) return i
    parent.set(i, find(parent.get(i)!))
    return parent.get(i)!
  }

  function union(i: number, j: number) {
    const rootI = find(i)
    const rootJ = find(j)
    if (rootI !== rootJ) {
      // 总是将 gid 大的指向 gid 小的，方便确定代表元
      if (rootI < rootJ) {
        parent.set(rootJ, rootI)
      } else {
        parent.set(rootI, rootJ)
      }
    }
  }

  // 初始化并查集，并将所有关联的 gid 合并
  for (const doc of galgamesWithSeries) {
    const allGidsInGroup = [doc.gid, ...(doc.series || [])]
    for (let i = 1; i < allGidsInGroup.length; i++) {
      union(allGidsInGroup[0], allGidsInGroup[i])
    }
  }

  // 3. 按代表元（根节点）整理分组
  const seriesGroups = new Map<number, number[]>() // Map<root_gid, [member_gids...]>
  const allGids = new Set<number>()
  galgamesWithSeries.forEach((g) => {
    allGids.add(g.gid)
    g.series?.forEach((gid) => allGids.add(gid))
  })

  for (const gid of allGids) {
    const root = find(gid)
    if (!seriesGroups.has(root)) {
      seriesGroups.set(root, [])
    }
    seriesGroups.get(root)!.push(gid)
  }

  // 4. 创建 galgame_series 并构建最终的映射
  console.log(`  ... Found ${seriesGroups.size} distinct series groups.`)
  const gidToSeriesIdMap = new Map<number, number>()

  for (const [rootGid, members] of seriesGroups.entries()) {
    // 使用代表元（通常是组里gid最小的）的名字作为系列名
    const seriesName = nameMap.get(rootGid) ?? `Series of ${rootGid}`

    try {
      const newSeries = await prisma.galgame_series.create({
        data: {
          name: seriesName,
          description: `Migrated series for game group starting with GID ${rootGid}.`
        }
      })
      console.log(
        `  ... Created series "${seriesName}" with ID ${newSeries.id}.`
      )

      // 将该组所有成员的 gid 都映射到这个新的 series_id
      for (const memberGid of members) {
        gidToSeriesIdMap.set(memberGid, newSeries.id)
      }
    } catch (e) {
      // 处理系列名可能重复的错误
      console.error(
        `Could not create series for root GID ${rootGid} with name "${seriesName}". It might already exist.`,
        e
      )
    }
  }

  console.log('✅ Galgame Series migration complete.')
  return gidToSeriesIdMap
}

/**
 * 主迁移函数，负责迁移 galgame 表。
 * 在此之前，请确保已经运行了用户、标签、引擎等的迁移，
 * 并且它们的 ID 映射已经缓存（如注释中所示）。
 */
async function migrateGalgames() {
  // 首先运行 series 迁移并获取 gid -> series_id 的映射
  const gidToSeriesIdMap = await migrateGalgameSeries()

  // 假设你已经迁移了 tag, engine, official 并创建了缓存
  // const cache = {
  //   galgameTagMap: await createTagNameToIdMap(), // Map<string, number>
  //   engineMap: await createEngineNameToIdMap(),   // Map<string, number>
  //   officialMap: await createOfficialNameToIdMap() // Map<string, number>
  // };

  console.log('\n🚀 Starting Galgame migration...')
  const total = await GalgameModel.countDocuments()
  const cursor = GalgameModel.find().lean().cursor()
  let migratedCount = 0
  let batch: Prisma.PrismaPromise<unknown>[] = []

  for await (const doc of cursor) {
    // 关键步骤：从 map 中获取 series_id
    const seriesId = gidToSeriesIdMap.get(doc.gid) ?? null

    const createPayload: Prisma.galgameCreateArgs = {
      data: {
        id: doc.gid, // 使用旧的 gid 作为新的主键 id
        vndb_id: doc.vndb_id,
        name_en_us: doc.name?.['en-us'] ?? '',
        name_ja_jp: doc.name?.['ja-jp'] ?? '',
        name_zh_cn: doc.name?.['zh-cn'] ?? '',
        name_zh_tw: doc.name?.['zh-tw'] ?? '',
        banner: doc.banner ?? '',
        intro_en_us: doc.introduction?.['en-us'] ?? '',
        intro_ja_jp: doc.introduction?.['ja-jp'] ?? '',
        intro_zh_cn: doc.introduction?.['zh-cn'] ?? '',
        intro_zh_tw: doc.introduction?.['zh-tw'] ?? '',
        content_limit: doc.content_limit ?? 'sfw',
        status: doc.status ?? 0,
        view: doc.views ?? 0,
        // Prisma schema 中没有 'type', 'language', 'platform' 字段，所以忽略
        resource_update_time: msToDate(doc.time) ?? doc.created,
        created: doc.created,
        updated: doc.updated,

        // 关联关系
        user_id: doc.uid,
        series_id: seriesId, // <-- 在这里使用我们计算出的 seriesId

        // 一对多关系，通过 create 嵌套写入
        alias: {
          create: doc.alias?.map((name) => ({ name })) ?? []
        },

        // 多对多关系，通过 create 嵌套写入
        like: {
          create: doc.likes?.map((uid) => ({ user_id: uid })) ?? []
        },
        favorite: {
          create: doc.favorites?.map((uid) => ({ user_id: uid })) ?? []
        },
        contributor: {
          create: doc.contributor?.map((uid) => ({ user_id: uid })) ?? []
        }

        // 多对多关系（通过显式关联表）
        // 下面的代码取消了注释，并假设你已经有了 cache
        // tag: {
        //   create: doc.tags?.map((tagName) => ({
        //     // tag_id: cache.galgameTagMap.get(tagName)!
        //     // 为了演示，我们直接在关联表中创建 tag
        //     tag: { connect: { name: tagName } }
        //   }))
        //   // .filter((t) => t.tag_id) ?? [] // 如果使用 cache, 需要过滤
        // },
        // engine: {
        //   create: doc.engine?.map((engineName) => ({
        //     // engine_id: cache.engineMap.get(engineName)!
        //     engine: { connect: { name: engineName } }
        //   }))
        //   // .filter((e) => e.engine_id) ?? []
        // },
        // official: {
        //   create: doc.official?.map((officialName) => ({
        //     // 假设 officialName 是唯一的
        //     // official_id: cache.officialMap.get(officialName)!
        //     official: { connect: { name: officialName } }
        //   }))
        //   // .filter((o) => o.official_id) ?? []
        // }

        // `resources`, `links`, `histories`, `comments` 在 Prisma schema 中
        // 是反向关系，不需要在这里填充。它们会在各自的 model 迁移时通过
        // `galgame_id` 关联到 galgame。
      }
    }

    // 注意：由于 id 是手动设置的，我们应该使用 `create` 而不是 `upsert`。
    // 在运行脚本前，请确保 `galgame` 表是空的。
    batch.push(prisma.galgame.create(createPayload))

    if (batch.length >= BATCH_SIZE) {
      await prisma.$transaction(batch)
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} galgames.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.$transaction(batch)
    migratedCount += batch.length
  }

  console.log(
    `✅ Galgame migration complete. Total migrated: ${migratedCount}.`
  )
}

// ---- Message Migrations ----

async function migrateMessages() {
  console.log('\n🚀 Starting Message migration...')

  // 1. 预加载所有有效的用户ID、Topic ID 和 Galgame ID 到 Set 中，用于快速查找
  console.log('  Fetching all valid IDs from target database...')

  // 获取用户ID
  const users = await prisma.user.findMany({ select: { id: true } })
  const validUserIds = new Set(users.map((u) => u.id))
  console.log(`  ... Found ${validUserIds.size} valid users.`)

  // 获取 Topic ID
  const topics = await prisma.topic.findMany({ select: { id: true } })
  const validTopicIds = new Set(topics.map((t) => t.id))
  console.log(`  ... Found ${validTopicIds.size} valid topics.`)

  // 获取 Galgame ID
  const galgames = await prisma.galgame.findMany({ select: { id: true } })
  const validGalgameIds = new Set(galgames.map((g) => g.id))
  console.log(`  ... Found ${validGalgameIds.size} valid galgames.`)

  const total = await MessageModel.countDocuments()
  const cursor = MessageModel.find().lean().cursor()

  let migratedCount = 0
  let skippedCount = 0
  let batch: Prisma.messageCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    // 2. 校验 sender_id 和 receiver_id 是否有效
    if (
      !doc.sender_uid ||
      !doc.receiver_uid ||
      !validUserIds.has(doc.sender_uid) ||
      !validUserIds.has(doc.receiver_uid)
    ) {
      skippedCount++
      continue // 如果发送者或接收者ID为空或无效，则跳过
    }

    // 3. 校验 tid 和 gid 是否有效
    // 只有当 tid 或 gid 存在时，才进行校验。如果它们都为 null/undefined，则消息本身与 topic/galgame 无关，应该被迁移。
    // 如果 tid 存在，但它不在有效的 Topic ID 集合中，则跳过。
    if (doc.tid && !validTopicIds.has(doc.tid)) {
      skippedCount++
      continue
    }
    // 如果 gid 存在，但它不在有效的 Galgame ID 集合中，则跳过。
    if (doc.gid && !validGalgameIds.has(doc.gid)) {
      skippedCount++
      continue
    }
    // 只有通过所有校验的消息才会进入这里
    const link = doc.gid ? `/galgame/${doc.gid}` : `/topic/${doc.tid}`

    batch.push({
      id: doc.mid,
      content: doc.content.slice(0, 233),
      link,
      status: doc.status ?? 'unread',
      type: doc.type,
      sender_id: doc.sender_uid,
      receiver_id: doc.receiver_uid,
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.message.createMany({ data: batch, skipDuplicates: true })
      migratedCount += batch.length
      console.log(
        `  ... Migrated ${migratedCount} of ${total} messages. (Skipped: ${skippedCount})`
      )
      batch = []
    }
  }

  // 处理最后一批不足 BATCH_SIZE 的数据
  if (batch.length > 0) {
    await prisma.message.createMany({ data: batch, skipDuplicates: true })
    migratedCount += batch.length
  }

  console.log(
    `✅ Message migration complete. Total migrated: ${migratedCount}. Total skipped: ${skippedCount}.`
  )
}
async function migrateSystemMessages() {
  console.log('\n🚀 Starting System Message (MessageAdmin) migration...')
  const total = await MessageAdminModel.countDocuments()
  if (!total) {
    return
  }
  const cursor = MessageAdminModel.find().lean().cursor()

  let migratedCount = 0
  let batch: Prisma.system_messageCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    batch.push({
      id: doc.maid,
      content_en_us: doc.content?.['en-us'] ?? null,
      content_ja_jp: doc.content?.['ja-jp'] ?? null,
      content_zh_cn: doc.content?.['zh-cn'] ?? null,
      content_zh_tw: doc.content?.['zh-tw'] ?? null,
      status: doc.status ?? 'unread',
      user_id: doc.uid,
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.system_message.createMany({
        data: batch,
        skipDuplicates: true
      })
      migratedCount += batch.length
      console.log(
        `  ... Migrated ${migratedCount} of ${total} system messages.`
      )
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.system_message.createMany({
      data: batch,
      skipDuplicates: true
    })
    migratedCount += batch.length
  }

  console.log(
    `✅ System Message migration complete. Total migrated: ${migratedCount}.`
  )
}

// ---- Unmoe Migration ----

async function migrateUnmoes() {
  console.log('\n🚀 Starting Unmoe (NonMoe) migration...')
  const total = await NonMoeModel.countDocuments()
  const cursor = NonMoeModel.find().lean().cursor()

  let migratedCount = 0
  let batch: Prisma.unmoeCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    // Some user's account were deleted
    // Non-moe's data size is low, so directly use findUnique in a for condition
    const existUser = await prisma.user.findUnique({
      where: { id: doc.uid }
    })
    if (!existUser) {
      continue
    }
    batch.push({
      id: doc.nid,
      name: doc.name,
      result: doc.result ? JSON.stringify(doc.result) : '',
      desc_en_us: doc.description?.['en-us'] ?? '',
      desc_ja_jp: doc.description?.['ja-jp'] ?? '',
      desc_zh_cn: doc.description?.['zh-cn'] ?? '',
      desc_zh_tw: doc.description?.['zh-tw'] ?? '',
      user_id: doc.uid,
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.unmoe.createMany({ data: batch, skipDuplicates: true })
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} unmoes.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.unmoe.createMany({ data: batch, skipDuplicates: true })
    migratedCount += batch.length
  }

  console.log(`✅ Unmoe migration complete. Total migrated: ${migratedCount}.`)
}

// ---- Topic Reply Migration ----

async function migrateTopicRepliesAndComments() {
  console.log('🚀 Starting Topic Reply & Comment migration...')

  // --- 步骤 1: 预计算、缓存和预检 ---
  console.log('  [1/5] Caching valid User and Topic IDs from new database...')
  const validUsers = await prisma.user.findMany({ select: { id: true } })
  const validUserIds = new Set(validUsers.map((u) => u.id))
  const validTopics = await prisma.topic.findMany({ select: { id: true } })
  const validTopicIds = new Set(validTopics.map((t) => t.id))
  console.log(
    `      ... Cached ${validUserIds.size} user IDs and ${validTopicIds.size} topic IDs.`
  )

  // NEW: [2/6] Create a set to track processed and valid RIDs in this run
  console.log('  [2/6] Initializing processed RIDs tracker...')
  const processedValidRids = new Set<number>()

  console.log('  [3/6] Caching all comments by CID...')
  const allComments = await CommentModel.find({}).lean()
  const commentMap = new Map<string, (typeof allComments)[0]>()
  for (const comment of allComments) {
    commentMap.set(String(comment.cid), comment)
  }
  console.log(`      ... Cached ${commentMap.size} comments.`)

  console.log('  [4/6] Building floor-to-RID map for reply targeting...')
  const allRepliesForMap = await ReplyModel.find({}, 'rid tid floor').lean()
  const floorToRidMap = new Map<string, number>()
  for (const reply of allRepliesForMap) {
    const key = `${reply.tid}-${reply.floor}`
    floorToRidMap.set(key, reply.rid)
  }
  console.log(`      ... Built map with ${floorToRidMap.size} floor entries.`)

  // --- 步骤 2: 主迁移循环 ---
  console.log('  [5/6] Preparing to migrate replies and their nested data...')
  const total = await ReplyModel.countDocuments()
  const cursor = ReplyModel.find().lean().cursor()
  let migratedCount = 0
  let skippedCount = 0
  let batch: Prisma.PrismaPromise<unknown>[] = []
  let warnings = 0

  console.log('  [6/6] Starting migration loop...')
  for await (const doc of cursor) {
    if (!validTopicIds.has(doc.tid)) {
      console.warn(
        `  [!] Skipping Reply RID ${doc.rid}: Its Topic TID ${doc.tid} does not exist.`
      )
      skippedCount++
      continue
    }
    if (!validUserIds.has(doc.r_uid)) {
      console.warn(
        `  [!] Skipping Reply RID ${doc.rid}: Its author R_UID ${doc.r_uid} does not exist.`
      )
      skippedCount++
      continue
    }

    // MODIFIED: If the reply passes validation, add its RID to our tracker.
    // Do this BEFORE processing its own target logic.
    processedValidRids.add(doc.rid)

    let replyContent = ''
    let targetCreatePayload:
      | Prisma.topic_reply_targetCreateWithoutReplyInput
      | undefined

    if (doc.to_floor > 0) {
      const targetKey = `${doc.tid}-${doc.to_floor}`
      const targetReplyId = floorToRidMap.get(targetKey)

      if (targetReplyId) {
        // MODIFIED: Check against our in-memory set, not the database.
        // This correctly checks if the target reply has been processed and deemed valid in this script run.
        if (processedValidRids.has(targetReplyId)) {
          targetCreatePayload = {
            content: doc.content ?? '',
            target_reply: {
              connect: { id: targetReplyId }
            }
          }
          replyContent = ''
        } else {
          // This warning will now only trigger if the target reply was genuinely skipped
          // (e.g., its author was deleted) or for some other data inconsistency.
          replyContent = doc.content ?? '' // Fallback
          console.warn(
            `  [!] Warning: Target reply for RID ${doc.rid} (target RID ${targetReplyId}) was skipped or not found. Content moved to main reply.`
          )
          warnings++
        }
      } else {
        replyContent = doc.content ?? ''
        console.warn(
          `  [!] Warning: Could not find target reply for RID ${doc.rid} (TID: ${doc.tid}, to_floor: ${doc.to_floor}). Content moved to main reply.`
        )
        warnings++
      }
    } else {
      replyContent = doc.content ?? ''
    }

    // MODIFIED: 构建评论时检查用户是否存在
    const commentsToCreate: Prisma.topic_commentCreateWithoutTopic_replyInput[] =
      (doc.comment ?? [])
        .map((cid) => {
          const commentDoc = commentMap.get(String(cid))
          if (!commentDoc) {
            console.warn(
              `  [!] Warning: Comment with CID ${cid} referenced by Reply RID ${doc.rid} not found. Skipping comment.`
            )
            warnings++
            return null
          }

          // MODIFIED: 检查评论的创建者和目标用户是否存在
          if (!validUserIds.has(commentDoc.c_uid)) {
            console.warn(
              `  [!] Warning: Skipping Comment CID ${cid} because its author C_UID ${commentDoc.c_uid} does not exist.`
            )
            warnings++
            return null
          }
          if (!validUserIds.has(commentDoc.to_uid)) {
            console.warn(
              `  [!] Warning: Skipping Comment CID ${cid} because its target user TO_UID ${commentDoc.to_uid} does not exist.`
            )
            warnings++
            return null
          }

          return {
            // id: commentDoc.cid, // 如果 topic_comment 也想用旧 id，在这里加上
            content: commentDoc.content,
            created: commentDoc.created,
            updated: commentDoc.updated,
            topic: { connect: { id: commentDoc.tid } },
            user: { connect: { id: commentDoc.c_uid } },
            target_user: { connect: { id: commentDoc.to_uid } },
            like: {
              create: (commentDoc.likes ?? [])
                .filter((uid) => validUserIds.has(uid)) // MODIFIED: 只为存在的用户创建 like
                .map((uid) => ({
                  user: { connect: { id: uid } }
                }))
            }
          }
        })
        .filter((c): c is NonNullable<typeof c> => c !== null)

    const createPayload: Prisma.topic_replyCreateArgs = {
      data: {
        id: doc.rid,
        content: replyContent,
        floor: doc.floor,
        edited: msToDate(doc.edited),
        created: doc.created,
        updated: doc.updated,
        user_id: doc.r_uid,
        topic_id: doc.tid,
        like: {
          create: (doc.likes ?? [])
            .filter((uid) => validUserIds.has(uid)) // MODIFIED: 只为存在的用户创建 like
            .map((uid) => ({
              user_id: uid
            }))
        },
        dislike: {
          create: (doc.dislikes ?? [])
            .filter((uid) => validUserIds.has(uid)) // MODIFIED: 只为存在的用户创建 dislike
            .map((uid) => ({
              user_id: uid
            }))
        },
        comment: {
          create: commentsToCreate
        },
        ...(targetCreatePayload && { target: { create: targetCreatePayload } })
      }
    }

    batch.push(prisma.topic_reply.create(createPayload))

    if (batch.length >= BATCH_SIZE) {
      await prisma.$transaction(batch)
      migratedCount += batch.length
      console.log(
        `  ... Migrated ${migratedCount} of ${total} replies (skipped: ${skippedCount}).`
      )
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.$transaction(batch)
    migratedCount += batch.length
  }

  console.log('--- Migration Summary ---')
  console.log(`✅ Total documents processed: ${total}`)
  console.log(`➡️  Successfully migrated: ${migratedCount}`)
  console.log(
    `🚫 Skipped due to missing parent data (topic/user): ${skippedCount}`
  )
  if (warnings > 0) {
    console.log(
      `⚠️  Finished with ${warnings} warnings (e.g., missing target reply, skipped comments). Check logs for details.`
    )
  }
  console.log('--- Migration Complete ---')
}

// ---- Report Migration ----

async function migrateReports() {
  console.log('\n🚀 Starting Report migration...')
  const total = await ReportModel.countDocuments()
  const cursor = ReportModel.find().lean().cursor()

  let migratedCount = 0
  let batch: Prisma.reportCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    batch.push({
      id: doc.report_id,
      reason: doc.reason ?? '',
      type: doc.type ?? '',
      status: doc.status ?? 0,
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.report.createMany({ data: batch, skipDuplicates: true })
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} reports.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.report.createMany({ data: batch, skipDuplicates: true })
    migratedCount += batch.length
  }

  console.log(`✅ Report migration complete. Total migrated: ${migratedCount}.`)
}

// --- 迁移函数 ---

async function migrateChatRooms() {
  console.log('\n🚀 Starting ChatRoom migration...')
  const total = await ChatRoomModel.countDocuments()
  const cursor = ChatRoomModel.find().lean().cursor()

  let migratedCount = 0
  let batch: Prisma.PrismaPromise<unknown>[] = []

  for await (const doc of cursor) {
    const createPayload: Prisma.chat_roomCreateArgs = {
      data: {
        id: doc.crid,
        name: doc.name ?? '',
        avatar: doc.avatar ?? '',
        type: doc.type,
        last_message_content: doc.last_message?.content ?? '',
        last_message_time: msToDate(doc.last_message?.time),
        last_message_sender_id: doc.last_message?.sender_uid || null,
        last_message_sender_name: doc.last_message?.sender_name ?? '',
        created: doc.created,
        updated: doc.updated,
        participant: {
          create: doc.participants.map((uid: number) => ({ user_id: uid }))
        },
        admins: {
          create: doc.admins.map((uid: number) => ({ user_id: uid }))
        }
      }
    }

    batch.push(prisma.chat_room.create(createPayload))

    if (batch.length >= BATCH_SIZE) {
      await prisma.$transaction(batch)
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} chat rooms.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.$transaction(batch)
    migratedCount += batch.length
  }

  console.log(
    `✅ ChatRoom migration complete. Total migrated: ${migratedCount}.`
  )
}

async function migrateChatMessages() {
  console.log('\n🚀 Starting ChatMessage migration...')
  // 假设 BATCH_SIZE 和 msToDate 已经定义
  const BATCH_SIZE = 100 // 对于包含多层嵌套创建的事务，批次大小建议调小一些

  // 1. 从 PostgreSQL 预加载所有聊天室，并创建 name -> id 的映射
  console.log(
    '  Fetching all chat rooms from PostgreSQL to create a lookup map...'
  )
  const allChatRooms = await prisma.chat_room.findMany({
    select: {
      id: true,
      name: true
    }
  })

  const chatRoomNameToIdMap = new Map()
  for (const room of allChatRooms) {
    chatRoomNameToIdMap.set(room.name, room.id)
  }
  console.log(`  ... Created map with ${chatRoomNameToIdMap.size} chat rooms.`)

  // 同样，预加载所有有效的用户ID，因为 reaction 和 read_by 也需要
  console.log('  Fetching all valid user IDs from PostgreSQL...')
  const allUsers = await prisma.user.findMany({ select: { id: true } })
  const validUserIds = new Set(allUsers.map((user) => user.id))
  console.log(`  ... Found ${validUserIds.size} valid users.`)

  const total = await ChatMessageModel.countDocuments()
  const cursor = ChatMessageModel.find().lean().cursor()

  let migratedCount = 0
  let skippedCount = 0
  let batch: Prisma.PrismaPromise<unknown>[] = []

  for await (const doc of cursor) {
    // 2. 使用内存中的 Map 高效查找 chat_room_id
    const chatRoomId = chatRoomNameToIdMap.get(doc.chatroom_name)

    // 如果在新数据库中找不到对应的聊天室，则跳过
    if (!chatRoomId) {
      console.warn(
        `  ⚠️ Skipping message ${doc.cmid} because chatroom "${doc.chatroom_name}" does not exist in the target database.`
      )
      skippedCount++
      continue
    }

    // 同样，检查 sender 和 receiver 是否是有效用户
    if (
      !validUserIds.has(doc.sender_uid) ||
      (doc.receiver_uid && !validUserIds.has(doc.receiver_uid))
    ) {
      console.warn(
        `  ⚠️ Skipping message ${doc.cmid} due to invalid sender (${doc.sender_uid}) or receiver (${doc.receiver_uid}).`
      )
      skippedCount++
      continue
    }

    // 过滤掉 read_by 和 reactions 中 user_id 无效的条目
    const validReadBy = (doc.read_by || []).filter((read: { uid: number }) =>
      validUserIds.has(read.uid)
    )
    const validReactions = (doc.reactions || []).filter(
      (reaction: { uid: number }) => validUserIds.has(reaction.uid)
    )

    const createPayload: Prisma.chat_messageCreateArgs = {
      data: {
        id: doc.cmid,
        chatroom_name: doc.chatroom_name,
        content: doc.content ?? '',
        is_recall: doc.is_recalled ?? false,
        recall_time: msToDate(doc.recalled_time),
        created: doc.created,
        updated: doc.updated,

        // 使用从 Map 中查找到的 ID
        chat_room_id: chatRoomId,
        sender_id: doc.sender_uid,
        receiver_id: doc.receiver_uid,

        // 嵌套创建时，也只使用有效的用户数据
        read_by: {
          create: validReadBy.map(
            (read: { uid: number; read_time: number }) => ({
              user_id: read.uid,
              read_time: msToDate(read.read_time) ?? new Date()
            })
          )
        },
        reaction: {
          create: validReactions.map(
            (reaction: { uid: number; reaction: string }) => ({
              user_id: reaction.uid,
              reaction: reaction.reaction
            })
          )
        }
      }
    }

    batch.push(prisma.chat_message.create(createPayload))

    if (batch.length >= BATCH_SIZE) {
      await prisma.$transaction(batch)
      migratedCount += batch.length
      console.log(
        `  ... Migrated ${migratedCount} of ${total} chat messages. (Skipped: ${skippedCount})`
      )
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.$transaction(batch)
    migratedCount += batch.length
  }

  console.log(
    `✅ ChatMessage migration complete. Total migrated: ${migratedCount}. Total skipped: ${skippedCount}.`
  )
}

async function migrateGalgameComments() {
  console.log('\n🚀 Starting GalgameComment migration...')
  // PRE-REQUISITE: Assumes users and galgames are migrated.
  const total = await GalgameCommentModel.countDocuments()
  const cursor = GalgameCommentModel.find().lean().cursor()

  let migratedCount = 0
  let batch: Prisma.PrismaPromise<unknown>[] = []

  for await (const doc of cursor) {
    const createPayload: Prisma.galgame_commentCreateArgs = {
      data: {
        id: doc.gcid,
        content: doc.content ?? '',
        created: doc.created,
        updated: doc.updated,

        galgame_id: doc.gid,
        user_id: doc.c_uid,
        target_user_id: doc.to_uid ? doc.to_uid : null,

        like: {
          create: doc.likes.map((uid: number) => ({ user_id: uid }))
        }
      }
    }

    batch.push(prisma.galgame_comment.create(createPayload))

    if (batch.length >= BATCH_SIZE) {
      await prisma.$transaction(batch)
      migratedCount += batch.length
      console.log(
        `  ... Migrated ${migratedCount} of ${total} galgame comments.`
      )
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.$transaction(batch)
    migratedCount += batch.length
  }

  console.log(
    `✅ GalgameComment migration complete. Total migrated: ${migratedCount}.`
  )
}

async function migrateGalgameHistories() {
  console.log('\n🚀 Starting GalgameHistory migration...')

  // 1. 预先加载所有有效的用户 ID
  console.log('  Fetching all valid user IDs from PostgreSQL...')
  const allUsers = await prisma.user.findMany({
    select: {
      id: true // 只需要 id 字段
    }
  })
  // 2. 将 ID 存入 Set 以便高效查询
  const validUserIds = new Set(allUsers.map((user) => user.id))
  console.log(`  ... Found ${validUserIds.size} valid users.`)

  const total = await GalgameHistoryModel.countDocuments()
  const cursor = GalgameHistoryModel.find().lean().cursor()

  let migratedCount = 0
  let skippedCount = 0 // 新增一个计数器，用于记录跳过了多少条数据
  let batch: Prisma.galgame_historyCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    // 3. 在添加数据到批处理前，先进行校验
    if (validUserIds.has(doc.uid)) {
      // 只有当 uid 存在于 validUserIds 中时，才处理这条数据
      batch.push({
        id: doc.ghid,
        action: doc.action ?? '',
        type: doc.type ?? '',
        content: doc.content ?? '',
        galgame_id: doc.gid,
        user_id: doc.uid, // 这里的 doc.uid 是有效的
        created: doc.created,
        updated: doc.updated
      })
    } else {
      // 如果 uid 无效，则跳过这条数据，并增加跳过计数
      skippedCount++
    }

    if (batch.length >= BATCH_SIZE) {
      await prisma.galgame_history.createMany({
        data: batch,
        skipDuplicates: true
      })
      migratedCount += batch.length
      console.log(
        `  ... Migrated ${migratedCount} of ${total} galgame histories. (Skipped: ${skippedCount})`
      )
      batch = []
    }
  }

  // 处理最后一批不足 BATCH_SIZE 的数据
  if (batch.length > 0) {
    await prisma.galgame_history.createMany({
      data: batch,
      skipDuplicates: true
    })
    migratedCount += batch.length
  }

  console.log(
    `✅ GalgameHistory migration complete. Total migrated: ${migratedCount}. Total skipped due to missing user: ${skippedCount}.`
  )
}
async function migrateGalgameLinks() {
  console.log('\n🚀 Starting GalgameLink migration...')
  const total = await GalgameLinkModel.countDocuments()
  const cursor = GalgameLinkModel.find().lean().cursor()

  let migratedCount = 0
  let batch: Prisma.galgame_linkCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    batch.push({
      id: doc.glid,
      name: doc.name ?? '',
      link: doc.link ?? '',
      galgame_id: doc.gid,
      user_id: doc.uid,
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.galgame_link.createMany({
        data: batch,
        skipDuplicates: true
      })
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} galgame links.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.galgame_link.createMany({ data: batch, skipDuplicates: true })
    migratedCount += batch.length
  }

  console.log(
    `✅ GalgameLink migration complete. Total migrated: ${migratedCount}.`
  )
}

async function migrateGalgamePRs() {
  console.log('\n🚀 Starting GalgamePR migration...')
  const total = await GalgamePRModel.countDocuments()
  const cursor = GalgamePRModel.find().lean().cursor()

  let migratedCount = 0
  let batch: Prisma.galgame_prCreateManyArgs['data'] = []

  for await (const doc of cursor) {
    batch.push({
      id: doc.gprid,
      status: doc.status ?? 0,
      index: doc.index ?? 0,
      note: doc.note ?? '',
      completed_time: msToDate(doc.completed_time),
      old_data: doc.galgame
        ? JSON.parse(JSON.stringify(doc.galgame))
        : Prisma.JsonNull,
      new_data: Prisma.JsonNull,
      user_id: doc.uid,
      galgame_id: doc.gid,
      created: doc.created,
      updated: doc.updated
    })

    if (batch.length >= BATCH_SIZE) {
      await prisma.galgame_pr.createMany({ data: batch, skipDuplicates: true })
      migratedCount += batch.length
      console.log(`  ... Migrated ${migratedCount} of ${total} galgame PRs.`)
      batch = []
    }
  }

  if (batch.length > 0) {
    await prisma.galgame_pr.createMany({ data: batch, skipDuplicates: true })
    migratedCount += batch.length
  }

  console.log(
    `✅ GalgamePR migration complete. Total migrated: ${migratedCount}.`
  )
}

// 数据清洗函数
function sanitizeString(input: string | null | undefined): string {
  if (typeof input !== 'string' || !input) {
    return ''
  }
  return input.replace(/\0/g, '')
}

async function migrateGalgameResources() {
  console.log('\n🚀 Starting GalgameResource migration...')

  // --- 步骤 1: 预检 - 缓存有效 ID ---
  console.log('  [1/3] Caching valid User and Galgame IDs from new database...')
  const validUsers = await prisma.user.findMany({ select: { id: true } })
  const validUserIds = new Set(validUsers.map((u) => u.id))

  const validGalgames = await prisma.galgame.findMany({ select: { id: true } })
  const validGalgameIds = new Set(validGalgames.map((g) => g.id))
  console.log(
    `      ... Cached ${validUserIds.size} user IDs and ${validGalgameIds.size} galgame IDs.`
  )

  // --- 步骤 2: 主迁移循环 ---
  console.log('  [2/3] Preparing to migrate galgame resources...')
  const total = await GalgameResourceModel.countDocuments()
  const cursor = GalgameResourceModel.find().lean().cursor()

  let migratedCount = 0
  let skippedCount = 0 // 新增：用于跟踪跳过的记录
  let batch: { grid: number; payload: Prisma.PrismaPromise<unknown> }[] = []

  console.log('  [3/3] Starting migration loop...')
  for await (const doc of cursor) {
    // MODIFIED: 完整性检查
    // 检查必需的父级 galgame 是否存在
    if (!validGalgameIds.has(doc.gid)) {
      console.warn(
        `  [!] Skipping Resource (GRID: ${doc.grid}): Its parent Galgame (GID: ${doc.gid}) does not exist.`
      )
      skippedCount++
      continue
    }
    if (!validUserIds.has(doc.uid)) {
      console.warn(
        `  [!] Skipping Resource (GRID: ${doc.grid}): Its creator User (UID: ${doc.uid}) does not exist.`
      )
      skippedCount++
      continue
    }

    const createPayload: Prisma.galgame_resourceCreateArgs = {
      data: {
        id: doc.grid,
        type: doc.type ?? '',
        language: doc.language ?? '',
        platform: doc.platform ?? '',
        size: doc.size ?? '',
        code: doc.code ?? '',
        password: doc.password ?? '',
        note: sanitizeString(doc.note) ?? '',
        status: doc.status ?? 0,
        created: doc.created,
        updated: doc.updated,

        // 经过检查，这些 ID 是有效的
        galgame_id: doc.gid,
        user_id: doc.uid,

        link: {
          create: (doc.link ?? []).map((url: string) => ({ url }))
        },
        like: {
          // MODIFIED: 过滤掉不存在的用户的 like
          create: (doc.likes ?? [])
            .filter((uid) => {
              const userExists = validUserIds.has(uid)
              if (!userExists) {
                console.warn(
                  `  [!] Warning: Skipping like for Resource GRID ${doc.grid} from non-existent User UID ${uid}.`
                )
              }
              return userExists
            })
            .map((uid: number) => ({ user_id: uid }))
        }
      }
    }

    batch.push({
      grid: doc.grid,
      payload: prisma.galgame_resource.create(createPayload)
    })

    if (batch.length >= BATCH_SIZE) {
      try {
        await prisma.$transaction(batch.map((b) => b.payload)) // 只有 payload 被传入 transaction
        migratedCount += batch.length
        console.log(
          `  ... Migrated ${migratedCount} of ${total} galgame resources (skipped: ${skippedCount}).`
        )
      } catch (error) {
        // MODIFIED: Detailed error handling for failed batch
        console.error(
          `  [!] Error in batch processing. Trying records one by one to identify the faulty one...`
        )
        for (const item of batch) {
          try {
            await item.payload // PrismaPromise can be awaited directly
            migratedCount++
          } catch (singleError) {
            console.error(
              `  [!] FAILED to migrate record with GRID: ${item.grid}. Error: ${singleError}`
            )
            // 可以选择将失败的 grid 记录到文件中
            // fs.appendFileSync('failed_grids.log', `${item.grid}\n`);
            skippedCount++
          }
        }
        console.log(
          `  ... Recovered from batch error. Current migrated count: ${migratedCount}.`
        )
      } finally {
        batch = []
      }
    }
  }

  // Final batch processing (with the same error handling)
  if (batch.length > 0) {
    try {
      await prisma.$transaction(batch.map((b) => b.payload))
      migratedCount += batch.length
    } catch (error) {
      console.error(
        `  [!] Error in final batch processing. Trying records one by one...`
      )
      for (const item of batch) {
        try {
          await item.payload
          migratedCount++
        } catch (singleError) {
          console.error(
            `  [!] FAILED to migrate record with GRID: ${item.grid}. Error: ${singleError}`
          )
          skippedCount++
        }
      }
    }
  }

  console.log('--- Migration Summary ---')
  console.log(`✅ Total documents processed: ${total}`)
  console.log(`➡️  Successfully migrated: ${migratedCount}`)
  console.log(
    `🚫 Skipped due to missing parent data (galgame/user): ${skippedCount}`
  )
  console.log('--- Migration Complete ---')
}

// --- 主函数 ---
async function main() {
  if (!MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in .env file.')
    process.exit(1)
  }

  console.log('--- Database Migration Script ---')
  console.log('Source: MongoDB')
  console.log('Target: PostgreSQL (via Prisma)')

  // const confirmed = await askConfirmation(
  //   '\n⚠️ This script will DELETE ALL DATA in the target PostgreSQL database before migrating. Are you sure you want to continue? (type "yes"): '
  // )
  // if (!confirmed) {
  //   console.log('Migration cancelled by user.')
  //   return
  // }

  await mongoose.connect(MONGO_URI)
  console.log('✅ Connected to MongoDB.')

  try {
    await prisma.$connect()
    console.log('✅ Connected to PostgreSQL.')

    // 1. 清空目标数据库
    await clearPostgresData()
    // execSync('pnpm prisma migrate reset --force')

    // 2. Pre-cache all lookup tables for massive performance gain
    const cache = await precacheLookups()

    // Level 0: Standalone or foundational models
    await migrateUsers() // MUST be first
    await migrateUpdateLogs()
    await migrateReports()
    await migrateTodos() // Has a placeholder for user_id

    // Level 1: Models that depend on Level 0
    await migrateTopics(cache)
    await migrateGalgames() // Pass cache to it
    await migrateChatRooms()
    await migrateSystemMessages() // Depends on User
    await migrateUnmoes() // Depends on User
    await migrateMessages() // Depends on User

    // Level 2: Models that depend on Level 1
    await migrateTopicRepliesAndComments() // Depends on Topic, User
    await migrateGalgameResources() // Depends on Galgame, User
    await migrateGalgamePRs() // Depends on Galgame, User
    await migrateGalgameLinks() // Depends on Galgame, User
    await migrateGalgameHistories() // Depends on Galgame, User
    await migrateChatMessages() // Depends on ChatRoom, User

    // Level 3: Models that depend on Level 2
    await migrateGalgameComments() // Depends on Galgame, User

    // 3. 重置所有表的 ID 序列
    console.log('\n🔄 Resetting all table sequences...')
    const tablesToReset = [
      'user',
      'update_log',
      'report',
      'todo',
      'topic_section',
      'topic',
      'topic_upvote',
      'topic_like',
      'topic_dislike',
      'topic_favorite',
      'topic_reply',
      'topic_reply_like',
      'topic_reply_dislike',
      'topic_reply_target',
      'topic_comment',
      'topic_comment_like',
      'galgame_series',
      'galgame_tag',
      'galgame_engine',
      'galgame_official',
      'galgame',
      'galgame_alias',
      'galgame_like',
      'galgame_favorite',
      'galgame_contributor',
      'galgame_comment',
      'galgame_comment_like',
      'galgame_history',
      'galgame_link',
      'galgame_pr',
      'galgame_resource',
      'galgame_resource_link',
      'galgame_resource_like',
      'chat_room',
      'chat_room_participant',
      'chat_room_admin',
      'chat_message',
      'chat_message_read_by',
      'chat_message_reaction',
      'message',
      'system_message',
      'unmoe',
      'user_friend',
      'user_follow'
    ]
    for (const table of tablesToReset.sort()) {
      await resetSequence(table)
    }

    console.log('\n🎉 --- Migration finished successfully! ---')
  } catch (error) {
    console.error('\n❌ An error occurred during migration:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    await prisma.$disconnect()
    console.log('\n🔌 Disconnected from databases.')
  }
}

main()
