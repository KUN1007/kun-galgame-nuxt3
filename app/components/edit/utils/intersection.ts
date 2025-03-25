export const intersection = <T>(array1: T[], array2: T[]): T[] => {
  const set1 = new Set(array1)
  const set2 = new Set(array2)
  const result: T[] = []

  set1.forEach((item) => {
    if (set2.has(item)) {
      result.push(item)
    }
  })

  return result
}
