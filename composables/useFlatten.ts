type FlattenObject<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]-?: FlattenObject<O[K]> }
    : never
  : T

export const useFlatten = <T extends object>(obj: T): FlattenObject<T> => {
  type Flattened = FlattenObject<T>

  const flattened: Partial<Flattened> = {}

  function flattenHelper(prefix: string, value: any) {
    if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          flattenHelper(prefix ? `${prefix}.${key}` : key, value[key])
        }
      }
    } else {
      ;(flattened as any)[prefix] = value
    }
  }

  flattenHelper('', obj)
  return flattened as Flattened
}
