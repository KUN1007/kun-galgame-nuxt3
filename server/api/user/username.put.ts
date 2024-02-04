import UserModel from '~/server/models/user'
import { isValidName } from '~/utils/validate'

export default defineEventHandler(async (event) => {
  const { username }: { username: string } = await readBody(event)

  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  if (!isValidName(username)) {
    kunError(event, 10117)
    return
  }

  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (!user) {
    kunError(event, 10101)
    return
  }
  if (user.moemoepoint < 1017) {
    kunError(event, 10118)
    return
  }

  const duplicatedNumber = await UserModel.countDocuments({
    name: { $regex: new RegExp('^' + username + '$', 'i') },
  })
  if (duplicatedNumber) {
    kunError(event, 10105)
    return
  }

  await UserModel.updateOne(
    { uid: userInfo.uid },
    { $set: { name: username }, $inc: { moemoepoint: -17 } }
  )

  return 'Moe Moe'
})
