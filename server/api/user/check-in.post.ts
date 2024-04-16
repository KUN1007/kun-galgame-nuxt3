import UserModel from '~/server/models/user'
import { randomNum } from '~/utils/random'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (!user) {
    return kunError(event, 10101)
  }
  if (user.daily_check_in) {
    return kunError(event, 10119)
  }

  const randomMoemoepoints = randomNum(0, 7)

  await UserModel.updateOne(
    { uid: userInfo.uid },
    { $inc: { moemoepoint: randomMoemoepoints }, $set: { daily_check_in: 1 } }
  )

  return randomMoemoepoints
})
