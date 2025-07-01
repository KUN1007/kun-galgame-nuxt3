import UserModel from '~/server/models/user'
import GalgameModel from '~/server/models/galgame'
import GalgameResourceModel from '~/server/models/galgame-resource'
import type {
  UserGalgameResource,
  UserGetGalgameResourceRequestData
} from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')
  if (!uid) {
    return kunError(event, 10101)
  }

  const { page, limit, type }: UserGetGalgameResourceRequestData =
    await getQuery(event)
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

  const resourceArray =
    {
      valid: user.galgame_resource,
      invalid: user.galgame_resource,
      like: user.like_galgame_resource
    }[type] || []

  const totalCount = await GalgameResourceModel.countDocuments({
    grid: { $in: resourceArray },
    status: type === 'like' ? { $ne: 1 } : type === 'valid' ? 0 : 1
  }).lean()
  const data = await GalgameResourceModel.find({
    grid: { $in: resourceArray },
    status: type === 'like' ? { $ne: 1 } : type === 'valid' ? 0 : 1
  })
    .sort({ created: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('game', 'name', GalgameModel)
    .lean()

  const resources: UserGalgameResource[] = data.map((res) => ({
    gid: res.gid,
    name: res.game[0].name,
    platform: res.platform,
    status: res.status,
    time: new Date(res.time).getTime()
  }))
  return { resources, totalCount }
})
