export interface UploadSaltCache {
  key: string
  type: string
  salt: string
  filesize: number
  normalizedFilename: string
  fileExtension: string
}

export const saveUploadSalt = async (
  key: string,
  type: 'small' | 'large',
  salt: string,
  filesize: number,
  normalizedFilename: string,
  fileExtension: string
) => {
  const storedValue = JSON.stringify({
    key,
    type,
    salt,
    filesize,
    normalizedFilename,
    fileExtension
  } satisfies UploadSaltCache)

  await useStorage('redis').setItem(`toolset:resource:${salt}`, storedValue)
}

export const getUploadCache = async (salt?: string) => {
  const res = await useStorage('redis').getItem(`toolset:resource:${salt}`)
  if (!res) {
    return
  }

  // useStorage may auto parse a stringified object
  const parsedResult = JSON.parse(JSON.stringify(res)) as UploadSaltCache
  return parsedResult
}

export const removeUploadCache = async (salt: string) => {
  await useStorage('redis').removeItem(`toolset:resource:${salt}`)
}
