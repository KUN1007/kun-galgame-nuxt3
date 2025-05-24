import { hash, compare } from 'bcrypt'
import UserModel from '~/server/models/user'
import { isValidPassword } from '~/utils/validate'
import type { UserUpdatePasswordRequestData } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { oldPassword, newPassword }: UserUpdatePasswordRequestData =
    await readBody(event)

  if (!isValidPassword(oldPassword) || !isValidPassword(newPassword)) {
    return kunError(event, 10108)
  }

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }
  const uid = userInfo.uid

  const user = await UserModel.findOne({ uid })
  if (!user) {
    return kunError(event, 10101)
  }

  const isCorrectPassword = await compare(oldPassword, user.password)
  if (!isCorrectPassword) {
    return kunError(event, 10102)
  }

  const hashedPassword = await hash(newPassword, 7)
  await UserModel.updateOne({ uid }, { $set: { password: hashedPassword } })

  return 'Moe Moe'
})
