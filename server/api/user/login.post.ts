import bcrypt from 'bcrypt'
import UserModel from '~/server/models/user'
import type { LoginRequestData } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { name, password }: LoginRequestData = await readBody(event)

  const user = await UserModel.findOne({ $or: [{ name }, { email: name }] })
  if (!user) {
    return 10101
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    return 10102
  }

  const { token, refreshToken } = await generateTokens(user.uid, user.name)

  const userInfo = {
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    moemoepoint: user.moemoepoint,
    roles: user.roles,
    token,
  }

  return {
    data: userInfo,
    refreshToken,
  }
})
