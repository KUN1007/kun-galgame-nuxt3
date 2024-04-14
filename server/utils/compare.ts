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

interface _Difference {
  oldValue: any
  newValue: any
}

export const compareObjects = <T extends object>(
  obj1: T,
  obj2: T
): Record<string, _Difference> => {
  const diff: Record<string, _Difference> = {}

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = new Set([...keys1, ...keys2])

  allKeys.forEach((key) => {
    if (obj1[key as keyof T] !== obj2[key as keyof T]) {
      diff[key] = {
        oldValue: obj1[key as keyof T],
        newValue: obj2[key as keyof T]
      }
    }
  })

  return diff
}
