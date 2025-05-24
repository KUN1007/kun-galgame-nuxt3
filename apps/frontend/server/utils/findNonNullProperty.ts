export const findNonNullProperty = <T>(obj: T): T[keyof T] | '' => {
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== '' &&
      obj[key] !== null &&
      obj[key] !== undefined
    ) {
      return obj[key]
    }
  }
  return ''
}
