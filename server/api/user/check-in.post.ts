import UserModel from '~/server/models/user'
import { randomNum } from '~/utils/random'

export default defineEventHandler(async (event) => {
  const userInfo = getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const user = await UserModel.findOne({ uid: userInfo.uid })
  if (user?.daily_check_in) {
    kunError(event, 10119, 205)
    return
  }

  const randomMoemoepoints = randomNum(0, 7)

  // await UserModel.updateOne(
  //   { uid: userInfo.uid },
  //   { $inc: { moemoepoint: randomMoemoepoints }, $set: { daily_check_in: 1 } }
  // )

  await UserModel.updateOne(
    { uid: userInfo.uid },
    { $inc: { moemoepoint: randomMoemoepoints } }
  )

  return randomMoemoepoints
})
