export const isValidTimestamp = (timestamp: number) => {
  return (
    timestamp.toString().length === 10 || timestamp.toString().length === 13
  )
}

export const isValidURL = (url: string) => {
  try {
    const _ = new URL(url)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{1,24}$/
  return regex.test(email)
}

export const isValidName = (name: string) => {
  const regex = /^[\p{L}\p{N}!~_@#$%^&*()+=-]{1,17}$/u
  return regex.test(name)
}

export const isValidPassword = (pwd: string) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[\w!@#$%^&*()+=\\/-]{6,107}$/
  return regex.test(pwd)
}

export const isValidMailConfirmCode = (code: string) => {
  const regex = /^[a-zA-Z0-9]{7}$/
  return regex.test(code)
}

export const isValidKunLanguage = (
  language: KunLanguage,
  maxLength: number
) => {
  const values = Object.values(language)
  const isNotEmpty = values.some((value) => value.trim() !== '')
  const isWithinLengthLimit = values.every((value) => value.length <= maxLength)
  return isNotEmpty && isWithinLengthLimit
}
