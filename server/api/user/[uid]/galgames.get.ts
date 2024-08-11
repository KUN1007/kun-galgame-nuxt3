import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import type { UserGalgame, UserGetGalgameRequestData } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')
  if (!uid) {
    return kunError(event, 10101)
  }

  const { page, limit, type }: UserGetGalgameRequestData = await getQuery(event)
  if (!page || !limit || !type) {
    return kunError(event, 10507)
  }
  if (limit !== '50') {
    return kunError(event, 10209)
  }
  const skip = (parseInt(page) - 1) * parseInt(limit)

  const user = await UserModel.findOne({ uid }).lean()
  if (!user) {
    return kunError(event, 10114)
  }

  const galgameArray =
    {
      publish: user.galgame,
      like: user.like_galgame,
      favorite: user.favorite_galgame,
      contribute: user.contribute_galgame
    }[type] || []

  const totalCount = await GalgameModel.countDocuments({
    gid: { $in: galgameArray },
    status: { $ne: 1 }
  }).lean()
  const data = await GalgameModel.find({
    gid: { $in: galgameArray },
    status: { $ne: 1 }
  })
    .sort({ created: -1 })
    .skip(skip)
    .limit(parseInt(limit))

  const galgames: UserGalgame[] = data.map((galgame) => ({
    gid: galgame.gid,
    name: galgame.name,
    time: new Date(galgame.time).getTime()
  }))
  return { galgames, totalCount }
})
