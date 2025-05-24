import UserModel from '~/server/models/user'
import { isValidName } from '~/utils/validate'

export default defineEventHandler(async (event) => {
  const { username }: { username: string } = await readBody(event)

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  if (!isValidName(username)) {
    return kunError(event, 10117)
  }

  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (!user) {
    return kunError(event, 10101)
  }
  if (user.moemoepoint < 1017) {
    return kunError(event, 10118)
  }

  const duplicatedNumber = await UserModel.countDocuments({
    name: { $regex: new RegExp('^' + username + '$', 'i') }
  })
  if (duplicatedNumber) {
    return kunError(event, 10105)
  }

  await UserModel.updateOne(
    { uid: userInfo.uid },
    { $set: { name: username }, $inc: { moemoepoint: -17 } }
  )

  return 'Moe Moe'
})
