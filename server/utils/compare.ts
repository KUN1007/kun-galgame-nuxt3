export const compareStrings = (str1: string, str2: string) => {
  return str1
    .split('')
    .reduce((result: string[], char, index) => {
      if (char !== str2[index]) {
        result.push(`${char} => ${str2[index]}`)
      }
      return result
    }, [])
    .toString()
}

export interface Difference<T extends object> {
  oldValue: T | unknown
  newValue: T | unknown
}

export const compareObjects = <T extends object>(
  obj1: T,
  obj2: T
): Record<string, Difference<T>> => {
  const diff: Record<string, Difference<T>> = {}

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = new Set([...keys1, ...keys2])

  allKeys.forEach((key) => {
    const val1 = obj1[key as keyof T]
    const val2 = obj2[key as keyof T]
    if (val1 !== val2) {
      if (
        typeof val1 === 'object' &&
        val1 !== null &&
        typeof val2 === 'object' &&
        val2 !== null
      ) {
        diff[key] = {
          oldValue: compareObjects(val1, val2),
          newValue: undefined
        }
      } else {
        diff[key] = {
          oldValue: val1,
          newValue: val2
        }
      }
    }
  })

  return diff
}
