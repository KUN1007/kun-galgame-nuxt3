import bcrypt from 'bcrypt'
import UserModel from '~/server/models/user'
import { isValidEmail, isValidName, isValidPassword } from '~/utils/validate'
import type { H3Event } from 'h3'
import type { LoginRequestData, LoginResponseData } from '~/types/api/user'

const login = async (event: H3Event) => {
  const { name, password }: LoginRequestData = await readBody(event)
  const ip = getRemoteIp(event)

  if (
    !(isValidName(name) || isValidEmail(name)) ||
    !isValidPassword(password)
  ) {
    kunError(event, 10107)
    return
  }

  const loginCD = await useStorage('redis').getItem(`loginCD:${ip}`)
  if (loginCD) {
    kunError(event, 10112)
    return
  } else {
    useStorage('redis').setItem(`loginCD:${ip}`, ip, { ttl: 17 })
  }

  return { name, password }
}

export default defineEventHandler(async (event) => {
  const result = await login(event)
  if (!result) {
    return
  }
  const { name, password } = result

  const user = await UserModel.findOne({ $or: [{ name }, { email: name }] })
  if (!user) {
    kunError(event, 10101)
    return
  }
  if (user.status) {
    kunError(event, 10120)
    return
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    kunError(event, 10102)
    return
  }

  const { token, refreshToken } = await createTokens(user.uid, user.name)
  deleteCookie(event, 'kungalgame-is-navigate-to-login')
  setCookie(event, 'kungalgame-moemoe-refresh-token', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  const userInfo: LoginResponseData = {
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    moemoepoint: user.moemoepoint,
    roles: user.roles,
    token,
  }

  return userInfo
})
