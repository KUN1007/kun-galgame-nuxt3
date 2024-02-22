import bcrypt from 'bcrypt'
import UserModel from '~/server/models/user'
import { isValidPassword } from '~/utils/validate'
import type { UserUpdatePasswordRequestData } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { oldPassword, newPassword }: UserUpdatePasswordRequestData =
    await readBody(event)

  if (!isValidPassword(oldPassword) || !isValidPassword(newPassword)) {
    kunError(event, 10108)
    return
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    kunError(event, 10115, 205)
    return
  }
  const uid = userInfo.uid

  const user = await UserModel.findOne({ uid })
  if (!user) {
    kunError(event, 10101)
    return
  }

  const isCorrectPassword = await bcrypt.compare(oldPassword, user.password)
  if (!isCorrectPassword) {
    kunError(event, 10102)
    return
  }

  const hashedPassword = await bcrypt.hash(newPassword, 7)
  await UserModel.updateOne({ uid }, { $set: { password: hashedPassword } })

  return 'Moe Moe'
})
