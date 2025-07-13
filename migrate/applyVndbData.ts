import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const INPUT_FILE = path.join(__dirname, 'vndb_data.json')

interface OutputData {
  engines: Record<string, { name: string }>
  officials: Record<
    string,
    {
      id: string
      name: string
      category: string
      lang: string
      aliases: string[]
    }
  >
  tags: Record<
    string,
    {
      id: string
      name: string
      category: string
      aliases: string[]
    }
  >
  galgames: Record<
    string,
    {
      officials: string[]
      engines: string[]
      tags: string[]
    }
  >
}

async function seedMasterDataAndCreateLookups(jsonData: OutputData) {
  console.log('🌱 Seeding master data tables (officials, engines, tags)...')

  const officialsToCreate = Object.values(jsonData.officials).map((o) => ({
    name: o.name,
    category: o.category,
    lang: o.lang
  }))
  await prisma.galgame_official.createMany({
    data: officialsToCreate,
    skipDuplicates: true
  })
  console.log(`   - Upserted ${officialsToCreate.length} officials.`)

  const enginesToCreate = Object.values(jsonData.engines).map((e) => ({
    name: e.name
  }))
  await prisma.galgame_engine.createMany({
    data: enginesToCreate,
    skipDuplicates: true
  })
  console.log(`   - Upserted ${enginesToCreate.length} engines.`)

  const tagsToCreate = Object.values(jsonData.tags).map((t) => ({
    name: t.name,
    category: t.category
  }))
  await prisma.galgame_tag.createMany({
    data: tagsToCreate,
    skipDuplicates: true
  })
  console.log(`   - Upserted ${tagsToCreate.length} tags.`)

  console.log('🗺️ Creating ID lookup maps...')

  const [allDbOfficials, allDbEngines, allDbTags] = await Promise.all([
    prisma.galgame_official.findMany({ select: { id: true, name: true } }),
    prisma.galgame_engine.findMany({ select: { id: true, name: true } }),
    prisma.galgame_tag.findMany({ select: { id: true, name: true } })
  ])

  const officialNameToVndbIdMap = new Map(
    Object.entries(jsonData.officials).map(([vndbId, data]) => [
      data.name,
      vndbId
    ])
  )
  const tagNameToVndbIdMap = new Map(
    Object.entries(jsonData.tags).map(([vndbId, data]) => [data.name, vndbId])
  )

  const officialVndbIdToDbIdMap = new Map<string, number>()
  allDbOfficials.forEach((dbOfficial) => {
    const vndbId = officialNameToVndbIdMap.get(dbOfficial.name)
    if (vndbId) {
      officialVndbIdToDbIdMap.set(vndbId, dbOfficial.id)
    }
  })

  const tagVndbIdToDbIdMap = new Map<string, number>()
  allDbTags.forEach((dbTag) => {
    const vndbId = tagNameToVndbIdMap.get(dbTag.name)
    if (vndbId) {
      tagVndbIdToDbIdMap.set(vndbId, dbTag.id)
    }
  })

  const engineNameToDbIdMap = new Map(allDbEngines.map((e) => [e.name, e.id]))

  console.log(
    `   - Created maps for ${officialVndbIdToDbIdMap.size} officials, ${engineNameToDbIdMap.size} engines, ${tagVndbIdToDbIdMap.size} tags.`
  )

  return { officialVndbIdToDbIdMap, engineNameToDbIdMap, tagVndbIdToDbIdMap }
}

async function createRelations(
  jsonData: OutputData,
  lookups: Awaited<ReturnType<typeof seedMasterDataAndCreateLookups>>
) {
  console.log('\n🔗 Creating relations for galgames...')

  const allVndbIdsInJson = Object.keys(jsonData.galgames)
  const allDbGalgames = await prisma.galgame.findMany({
    where: { vndb_id: { in: allVndbIdsInJson } },
    select: { id: true, vndb_id: true }
  })

  const galgameVndbIdToDbIdMap = new Map(
    allDbGalgames.map((g) => [g.vndb_id, g.id])
  )
  console.log(
    `   - Found ${galgameVndbIdToDbIdMap.size} matching galgames in the database.`
  )

  const officialRelations: { galgame_id: number; official_id: number }[] = []
  const engineRelations: { galgame_id: number; engine_id: number }[] = []
  const tagRelations: { galgame_id: number; tag_id: number }[] = []

  for (const [vndbId, relations] of Object.entries(jsonData.galgames)) {
    const galgameDbId = galgameVndbIdToDbIdMap.get(vndbId)
    if (!galgameDbId) {
      continue
    }

    for (const officialVndbId of relations.officials) {
      const officialDbId = lookups.officialVndbIdToDbIdMap.get(officialVndbId)
      if (officialDbId) {
        officialRelations.push({
          galgame_id: galgameDbId,
          official_id: officialDbId
        })
      }
    }

    for (const engineName of relations.engines) {
      const engineDbId = lookups.engineNameToDbIdMap.get(engineName)
      if (engineDbId) {
        engineRelations.push({ galgame_id: galgameDbId, engine_id: engineDbId })
      }
    }

    for (const tagVndbId of relations.tags) {
      const tagDbId = lookups.tagVndbIdToDbIdMap.get(tagVndbId)
      if (tagDbId) {
        tagRelations.push({ galgame_id: galgameDbId, tag_id: tagDbId })
      }
    }
  }

  console.log(
    `   - Preparing to insert ${officialRelations.length} official relations, ${engineRelations.length} engine relations, and ${tagRelations.length} tag relations.`
  )

  await prisma.galgame_official_relation.createMany({
    data: officialRelations,
    skipDuplicates: true
  })
  console.log(`   - Inserted official relations.`)

  await prisma.galgame_engine_relation.createMany({
    data: engineRelations,
    skipDuplicates: true
  })
  console.log(`   - Inserted engine relations.`)

  await prisma.galgame_tag_relation.createMany({
    data: tagRelations,
    skipDuplicates: true
  })
  console.log(`   - Inserted tag relations.`)
}

async function main() {
  console.log('🚀 Starting VNDB data migration script...')

  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(`Input file not found: ${INPUT_FILE}`)
  }
  const jsonData: OutputData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'))
  console.log(`   - Loaded data from ${INPUT_FILE}.`)

  const lookups = await seedMasterDataAndCreateLookups(jsonData)

  await createRelations(jsonData, lookups)

  console.log(
    '\n✅ Migration complete! All data has been applied to the database.'
  )
}

main()
  .catch((e) => {
    console.error('❌ An error occurred during migration:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
