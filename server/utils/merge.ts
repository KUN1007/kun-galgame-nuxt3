type AnyObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const deepMergeObjects = <T extends AnyObject>(...objects: T[]): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isObject = (obj: any) => obj && typeof obj === 'object'

  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      const oldValue = acc[key]
      const newValue = obj[key]

      if (Array.isArray(oldValue) && Array.isArray(newValue)) {
        acc[key] = [...oldValue, ...newValue]
      } else if (isObject(oldValue) && isObject(newValue)) {
        acc[key] = deepMergeObjects(oldValue, newValue)
      } else {
        acc[key] = newValue
      }
    })
    return acc
  }, {} as AnyObject) as T
}

export const mergeLanguages = (
  lang1: KunLanguage,
  lang2: Partial<KunLanguage>
): KunLanguage => {
  const mergedLang: KunLanguage = { ...lang1 }

  Object.keys(lang2).forEach((key) => {
    if (lang2[key as keyof KunLanguage] !== undefined) {
      mergedLang[key as keyof KunLanguage] = lang2[key as keyof KunLanguage]!
    }
  })

  return mergedLang
}
