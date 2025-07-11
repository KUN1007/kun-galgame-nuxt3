interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDeepEmpty = (obj: any): boolean => {
  if (obj == null) {
    return true
  }

  if (typeof obj !== 'object') {
    return false
  }

  if (Array.isArray(obj)) {
    return obj.every((element) => isDeepEmpty(element) || element === '')
  }

  if (obj instanceof Map || obj instanceof Set) {
    return obj.size === 0
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!isDeepEmpty(obj[key])) {
        return false
      }
    }
  }

  return true
}

/**
 * Compare two objects，return a new object which contains diff content(new or update)
 */
export const createUpdatePayload = (
  oldObject: AnyObject,
  newObject: AnyObject
): AnyObject => {
  const payload: AnyObject = {}

  for (const key in newObject) {
    if (!Object.prototype.hasOwnProperty.call(newObject, key)) {
      continue
    }

    const newValue = newObject[key]
    const oldValue = oldObject[key]

    if (!(key in oldObject)) {
      payload[key] = newValue
      continue
    }

    if (
      typeof newValue === 'object' &&
      newValue !== null &&
      !Array.isArray(newValue) &&
      typeof oldValue === 'object' &&
      oldValue !== null &&
      !Array.isArray(oldValue)
    ) {
      const nestedChanges = createUpdatePayload(oldValue, newValue)

      if (Object.keys(nestedChanges).length > 0) {
        payload[key] = nestedChanges
      }
    } else if (Array.isArray(newValue)) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        payload[key] = newValue
      }
    } else if (newValue !== oldValue) {
      payload[key] = newValue
    }
  }

  return payload
}
