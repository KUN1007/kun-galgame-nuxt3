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
  const invisibleCharRegex =
    /[\x09\x20\xA0\xAD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u2000-\u200F\u202F\u205F\u2060-\u206F\u3000\u2800\u3164\uFEFF\uFFA0\uD800-\uDBFF\uDC00-\uDFFF\u1D159\u1D173-\u1D179\u1D17A\uE0020]+/g
  if (invisibleCharRegex.test(name)) {
    return false
  }
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
