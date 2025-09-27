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
  const invisibleChars = [
    '\u0009',
    '\u0020',
    '\u00A0',
    '\u00AD',
    '\u034F',
    '\u061C',
    '\u115F',
    '\u1160',
    '\u17B4',
    '\u17B5',
    '\u180E',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200A',
    '\u200B',
    '\u200C',
    '\u200D',
    '\u200E',
    '\u200F',
    '\u202F',
    '\u205F',
    '\u2060',
    '\u2061',
    '\u2062',
    '\u2063',
    '\u2064',
    '\u2065',
    '\u206A',
    '\u206B',
    '\u206C',
    '\u206D',
    '\u206E',
    '\u206F',
    '\u3000',
    '\u2800',
    '\u3164',
    '\uFEFF',
    '\uFFA0',
    '\u1D159',
    '\u1D173',
    '\u1D174',
    '\u1D175',
    '\u1D176',
    '\u1D177',
    '\u1D178',
    '\u1D179',
    '\u1D17A',
    '\uE0020'
  ]
  if (invisibleChars.some((char) => name.includes(char))) {
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

export const isValidArchive = (filename: string) => {
  const allowed = ['.zip', '.7z', '.rar']
  const lowerName = filename.toLowerCase()
  return allowed.some((ext) => lowerName.endsWith(ext))
}

const botUserAgents = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckgo',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot',
  'twitterbot',
  'linkedinbot',
  'embedly',
  'pinterest',
  'slackbot',
  'telegrambot',
  'discordbot',
  'whatsapp',
  'petalbot',
  'headlesschrome'
]

export const isBotAgent = new RegExp(
  `(${botUserAgents.join('|')}|\\w*(bot|spider))`,
  'i'
)
