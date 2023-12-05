import { Error } from 'mongoose'
import UserModel from '~/server/models/user'
import type { LoginRequestData } from '~/types/api/user'

import { z } from 'zod'
const objectSchema = z.object({
  name: z.string(),
  password: z.string(),
})
const body = await readValidatedBody(event, objectSchema.safeParse)

export default defineEventHandler(async (event) => {
  try {
    const body: ITodo = await readBody(event)
    if (!body) {
      return setResponse(event, {
        statusCode: 400,
        statusMessage: 'Item field is required.',
      })
    }
    await todoModel.create({ item: body.item })
    return setResponse(event, {
      statusCode: 200,
      statusMessage: 'New item has been added.',
    })
  } catch (error: unknown) {
    return setResponse(event, {
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    })
  }
})
