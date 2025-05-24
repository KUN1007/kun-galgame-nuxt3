import GalgameModel from '~/server/models/galgame'
import UserModel from '~/server/models/user'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10609)
  }

  const galgame = await GalgameModel.findOne({ gid, status: { $ne: 1 } }).lean()
  if (!galgame) {
    return kunError(event, 10610)
  }

  const users: KunUser[] = await UserModel.find({
    uid: { $in: galgame.contributor }
  }).select({ _id: 0, uid: 1, name: 1, avatar: 1 })

  return users
})
