export const generateTokens = async (uid: number, name: string) => {
  const token = generateToken(uid, name, '60m')
  const refreshToken = generateToken(uid, name, '7d')

  // see: https://unstorage.unjs.io/drivers/redis
  await useStorage('redis').setItem(`refreshToken:${uid}`, refreshToken, {
    ttl: 7 * 24 * 60 * 60,
  })

  return { token, refreshToken }
}
