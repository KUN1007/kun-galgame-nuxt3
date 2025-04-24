import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import type { HomeGalgame } from '~/types/api/home'

const getHomeGalgames = async (page: number, limit: number, nsfw: string) => {
  const skip = (page - 1) * limit

  const queryData = {
    status: { $ne: 1 },
    ...(nsfw === 'sfw' ? { content_limit: 'sfw' } : {})
  }

  const data = await GalgameModel.find(queryData)
    .sort({ time: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name', UserModel)
    .lean()

  const galgames: HomeGalgame[] = data.map((galgame) => ({
    gid: galgame.gid,
    name: galgame.name,
    banner: galgame.banner,
    contentLimit: galgame.content_limit,
    user: {
      uid: galgame.user[0].uid,
      name: galgame.user[0].name,
      avatar: galgame.user[0].avatar
    },
    views: galgame.views,
    likes: galgame.likes.length,
    favorites: galgame.favorites.length,
    time: galgame.time,
    platform: galgame.platform,
    language: galgame.language
  }))

  return galgames
}

export default defineEventHandler(async (event) => {
  const { page, limit }: KunPagination = await getQuery(event)
  if (limit !== '12') {
    return kunError(event, 10209)
  }

  const nsfw = getNSFWCookie(event)

  const result = await getHomeGalgames(parseInt(page), parseInt(limit), nsfw)

  return result
})
