import bcrypt from 'bcrypt'
import UserModel from '~/server/models/user'
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidMailConfirmCode,
} from '@/utils/validate'
import type { H3Event } from 'h3'
import type { LoginRequestData } from '~/types/api/user'

const loginController = async (event: H3Event) => {
  const { name, password }: LoginRequestData = await readBody(event)

  if (
    !(isValidName(name) || isValidEmail(name)) ||
    !isValidPassword(password)
  ) {
    return kunError(10107)
  }

  const loginCD = await useStorage('redis').getItem(`loginCD:${name}`)

  if (loginCD) {
    return kunError(10112)
  } else {
    useStorage('redis').setItem(`loginCD:${name}`, name, { ttl: 60 })
  }

  return { name, password }
}

export default defineEventHandler(async (event) => {
  const result = await loginController(event)
  if ('code' in result) {
    return
  }
  const { name, password } = result

  const user = await UserModel.findOne({ $or: [{ name }, { email: name }] })
  if (!user) {
    return kunError(10101)
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    return kunError(10102)
  }

  const { token, refreshToken } = await createTokens(user.uid, user.name)
  setCookie(event, 'kungalgame-moemoe-refresh-token', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  const userInfo = {
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    moemoepoint: user.moemoepoint,
    roles: user.roles,
    token,
  }

  return kunSuccess(userInfo)
})
