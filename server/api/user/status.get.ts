import UserModel from '~/server/models/user'
import type { HomeUserStatus } from '~/types/api/home'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }

  const user = await UserModel.findOne(
    { uid: userInfo.uid },
    { moemoepoint: 1, daily_check_in: 1, _id: 0 }
  )
  if (!user) {
    kunError(event, 10101)
    return
  }

  const responseData: HomeUserStatus = {
    moemoepoints: user.moemoepoint,
    isCheckIn: user.daily_check_in === 1
  }

  return responseData
})
