export const verifyVerificationCode = async (
  email: string,
  userProvidedCode: string
): Promise<boolean> => {
  const storedCode = await useStorage('redis').getItem(email)

  if (!storedCode) {
    return false
  }

  return userProvidedCode === storedCode
}
