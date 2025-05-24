export const verifyVerificationCode = async (
  key: string,
  userProvidedCode: string
): Promise<boolean> => {
  const storedCode = await useStorage('redis').getItem(key)

  if (!storedCode) {
    return false
  }

  return userProvidedCode === storedCode
}
