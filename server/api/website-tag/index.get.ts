import prisma from '~/prisma/prisma'
import type { WebsiteTag } from '~/types/api/website'

export default defineEventHandler(async (event) => {
  const data = await prisma.galgame_website_tag.findMany()

  const tags: WebsiteTag[] = data.map((t) => ({
    id: t.id,
    name: t.name,
    level: t.level
  }))

  return tags
})
