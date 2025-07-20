import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()
const BACKUP_FILE = path.join(__dirname, 'prisma_backup.json')

// 定义备份文件的数据结构类型
interface BackupData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  websites: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tagRelations: any[]
}

async function main() {
  console.log('🚀 Starting data restore...')

  try {
    const fileContent = await fs.readFile(BACKUP_FILE, 'utf-8')
    const backupData: BackupData = JSON.parse(fileContent)
    console.log('🔍 Backup file read successfully.')

    await prisma.$transaction(async (tx) => {
      console.log('🗑️ Clearing existing data...')
      await tx.galgame_website_tag_relation.deleteMany({})
      await tx.galgame_website.deleteMany({})
      await tx.galgame_website_tag.deleteMany({})
      await tx.galgame_website_category.deleteMany({})
      console.log('✅ Existing data cleared.')

      const oldCategoryIdToNewId = new Map<number, number>()
      const oldTagIdToNewId = new Map<number, number>()
      const oldWebsiteIdToNewId = new Map<number, number>()

      console.log(`⏳ Restoring ${backupData.categories.length} categories...`)
      for (const category of backupData.categories) {
        const { id, created, updated, website, ...dataToCreate } = category
        const newCategory = await tx.galgame_website_category.create({
          data: dataToCreate
        })
        oldCategoryIdToNewId.set(id, newCategory.id)
      }
      console.log('✅ Categories restored.')

      console.log(`⏳ Restoring ${backupData.tags.length} tags...`)
      for (const tag of backupData.tags) {
        const { id, created, updated, website, ...dataToCreate } = tag
        const newTag = await tx.galgame_website_tag.create({
          data: dataToCreate
        })
        oldTagIdToNewId.set(id, newTag.id)
      }
      console.log('✅ Tags restored.')

      console.log(`⏳ Restoring ${backupData.websites.length} websites...`)
      for (const website of backupData.websites) {
        const { id, created, updated, category_id, ...rest } = website

        const newCategoryId = oldCategoryIdToNewId.get(category_id)
        if (newCategoryId === undefined) {
          throw new Error(
            `Could not find new ID for old category ID: ${category_id}`
          )
        }

        const newWebsite = await tx.galgame_website.create({
          data: {
            ...rest,
            category_id: newCategoryId
          }
        })
        oldWebsiteIdToNewId.set(id, newWebsite.id)
      }
      console.log('✅ Websites restored.')

      console.log(
        `⏳ Restoring ${backupData.tagRelations.length} tag relations...`
      )
      for (const relation of backupData.tagRelations) {
        const { galgame_website_id, galgame_website_tag_id } = relation

        const newWebsiteId = oldWebsiteIdToNewId.get(galgame_website_id)
        const newTagId = oldTagIdToNewId.get(galgame_website_tag_id)

        if (newWebsiteId === undefined || newTagId === undefined) {
          throw new Error(
            `Could not find new IDs for old relation: websiteId=${galgame_website_id}, tagId=${galgame_website_tag_id}`
          )
        }

        await tx.galgame_website_tag_relation.create({
          data: {
            galgame_website_id: newWebsiteId,
            galgame_website_tag_id: newTagId
          }
        })
      }
      console.log('✅ Tag relations restored.')
    })

    console.log('🎉 Restore completed successfully!')
  } catch (error) {
    console.error('❌ Restore failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
