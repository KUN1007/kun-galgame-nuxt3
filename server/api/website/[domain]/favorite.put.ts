import prisma from '~/prisma/prisma'
import { toggleLikeFavoriteSchema } from '~/validations/website'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效', 205)
  }
  const uid = userInfo.uid

  const input = await kunParsePostBody(event, toggleLikeFavoriteSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const website = await prisma.galgame_website.findUnique({
    where: { id: input.websiteId },
    include: {
      favorite: {
        where: {
          user_id: uid
        }
      }
    }
  })
  if (!website) {
    return kunError(event, '未找到该网站')
  }

  const isFavorited = website.favorite.length > 0

  if (isFavorited) {
    await prisma.galgame_website_favorite.delete({
      where: {
        user_id_website_id: {
          user_id: uid,
          website_id: input.websiteId
        }
      }
    })
  } else {
    await prisma.galgame_website_favorite.create({
      data: {
        user_id: uid,
        website_id: input.websiteId
      }
    })
  }

  return 'MOEMOE favorite website successfully!'
})
