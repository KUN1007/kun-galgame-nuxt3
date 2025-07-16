import prisma from '~/prisma/prisma'
import { updateWebsiteSchema } from '~/validations/website'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }
  if (userInfo.role <= 2) {
    return kunError(event, '您没有权限更新这个网站')
  }

  const input = await kunParsePutBody(event, updateWebsiteSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const { tag_ids, websiteId, ...websiteData } = input

  return await prisma.$transaction(async (prisma) => {
    await prisma.galgame_website.update({
      where: { id: websiteId },
      data: websiteData
    })

    await prisma.galgame_website_tag_relation.deleteMany({
      where: {
        galgame_website_id: websiteId,
        galgame_website_tag_id: {
          notIn: tag_ids
        }
      }
    })

    const dataToCreate = tag_ids.map((sectionId) => ({
      galgame_website_id: websiteId,
      galgame_website_tag_id: sectionId
    }))
    await prisma.galgame_website_tag_relation.createMany({
      data: dataToCreate,
      skipDuplicates: true
    })

    return 'Moemoe update website success'
  })
})
