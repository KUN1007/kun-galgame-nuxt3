import { type H3Event, getQuery, readBody, readMultipartFormData } from 'h3'
import type { z, ZodSchema } from 'zod'

export const kunParseGetQuery = <T extends ZodSchema>(
  event: H3Event,
  schema: T
): z.infer<T> | string => {
  const queryParams = getQuery(event)

  const result = schema.safeParse(queryParams)
  if (!result.success) {
    return result.error.message
  }

  return result.data
}

export const kunParsePostBody = async <T extends ZodSchema>(
  event: H3Event,
  schema: T
): Promise<z.infer<T> | string> => {
  const body = await readBody(event)

  const result = schema.safeParse(body)
  if (!result.success) {
    return result.error.message
  }

  return result.data
}

export const kunParsePutBody = async <T extends ZodSchema>(
  event: H3Event,
  schema: T
): Promise<z.infer<T> | string> => {
  const body = await readBody(event)

  const result = schema.safeParse(body)
  if (!result.success) {
    return result.error.message
  }

  return result.data
}

export const kunParseDeleteQuery = <T extends ZodSchema>(
  event: H3Event,
  schema: T
): z.infer<T> | string => {
  const queryParams = getQuery(event)

  const result = schema.safeParse(queryParams)
  if (!result.success) {
    return result.error.message
  }

  return result.data
}

export const kunParseFormData = async <T extends ZodSchema>(
  event: H3Event,
  schema: T
): Promise<z.infer<T> | string> => {
  const formDataParts = await readMultipartFormData(event)
  const rawData: Record<string, unknown> = {}

  if (formDataParts) {
    for (const part of formDataParts) {
      const key = part.name
      if (!key) continue

      if (part.filename) {
        rawData[key] = part.data
      } else {
        rawData[key] = part.data.toString()
      }
    }
  }

  const result = schema.safeParse(rawData)
  if (!result.success) {
    return result.error.message
  }

  return result.data
}
