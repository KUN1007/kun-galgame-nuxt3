import GalgameModel from '~/server/models/galgame'
import type { GalgamePageRequestData, GalgameCard } from '~/types/api/galgame'

const getGalgames = async (
  page: number,
  limit: number,
  sortOrder: KunOrder
) => {
  const skip = (page - 1) * limit

  const totalCount = await GalgameModel.countDocuments({
    status: { $ne: 1 }
  })

  const data = await GalgameModel.find({ status: { $ne: 1 } })
    .sort({ created: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name')
    .lean()

  const galgames: GalgameCard[] = data.map((galgame) => ({
    gid: galgame.gid,
    name: galgame.name,
    banner: galgame.banner,
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

  return { galgames, totalCount }
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortOrder }: GalgamePageRequestData =
    await getQuery(event)
  if (!page || !limit || !sortOrder) {
    return kunError(event, 10507)
  }
  if (limit !== '24') {
    return kunError(event, 10209)
  }

  const galgames = await getGalgames(
    parseInt(page),
    parseInt(limit),
    sortOrder as KunOrder
  )

  return galgames
})
