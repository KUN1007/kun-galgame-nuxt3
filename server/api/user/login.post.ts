import { compare } from 'bcrypt'
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
    return kunError(event, 10107)
  }

  const loginCD = await useStorage('redis').getItem(`login:login:cd:${ip}`)
  if (loginCD) {
    return kunError(event, 10112)
  } else {
    useStorage('redis').setItem(`login:login:cd:${ip}`, ip, { ttl: 17 })
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
    return kunError(event, 10101)
  }
  if (user.status) {
    return kunError(event, 10120)
  }

  const isCorrectPassword = await compare(password, user.password)
  if (!isCorrectPassword) {
    return kunError(event, 10102)
  }

  const { token, refreshToken } = await createTokens(user.uid, user.name)
  deleteCookie(event, 'kungalgame-is-navigate-to-login')
  setCookie(event, 'kungalgame-moemoe-refresh-token', refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  })

  const userInfo: LoginResponseData = {
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    moemoepoint: user.moemoepoint,
    roles: user.roles,
    token
  }

  return userInfo
})
