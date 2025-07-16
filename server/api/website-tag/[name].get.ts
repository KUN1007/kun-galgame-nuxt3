import prisma from '~/prisma/prisma'
import { getWebsiteByTagSchema } from '~/validations/website'
import type { WebsiteCard } from '~/types/api/website'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getWebsiteByTagSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const data = await prisma.galgame_website.findMany({
    where: {
      tag: {
        some: {
          tag: {
            name: input.name
          }
        }
      }
    },
    include: {
      category: true,
      tag: {
        include: {
          tag: true
        }
      }
    }
  })

  const websites: WebsiteCard[] = data.map((w) => ({
    id: w.id,
    name: w.name,
    domain: w.url,
    description: w.description,
    ageLimit: w.age_limit,
    icon: w.icon,
    level: w.tag.reduce((acc, curr) => acc + curr.tag.level, 0),
    tags: w.tag.map((t) => t.tag),
    category: w.category.name
  }))

  return websites
})
