import GalgameModel from '~/server/models/galgame'
import UserModel from '~/server/models/user'

interface User {
  uid: number
  name: string
  avatar: string
}

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    kunError(event, 10609)
    return
  }

  const galgame = await GalgameModel.findOne({ gid }).lean()
  if (!galgame) {
    kunError(event, 10610)
    return
  }

  const users: User[] = await UserModel.find({
    uid: { $in: galgame.contributor }
  }).select({ _id: 0, uid: 1, name: 1, avatar: 1 })

  return users
})
