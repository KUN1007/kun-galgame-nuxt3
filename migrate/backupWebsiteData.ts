import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BACKUP_FILE = path.join(__dirname, 'prisma_backup.json')

async function main() {
  console.log('🚀 Starting data backup...')

  try {
    const [categories, tags, websites, tagRelations] = await Promise.all([
      prisma.galgame_website_category.findMany(),
      prisma.galgame_website_tag.findMany(),
      prisma.galgame_website.findMany(),
      prisma.galgame_website_tag_relation.findMany()
    ])

    const backupData = {
      categories,
      tags,
      websites,
      tagRelations
    }

    const jsonString = JSON.stringify(backupData, null, 2)

    await fs.writeFile(BACKUP_FILE, jsonString)

    console.log(`✅ Backup successful!`)
    console.log(`   - Categories: ${categories.length}`)
    console.log(`   - Tags: ${tags.length}`)
    console.log(`   - Websites: ${websites.length}`)
    console.log(`   - Tag Relations: ${tagRelations.length}`)
    console.log(`   Data saved to ${BACKUP_FILE}`)
  } catch (error) {
    console.error('❌ Backup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
