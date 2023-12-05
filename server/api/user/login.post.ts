import { Error } from "mongoose"
import todoModel from "~/server/models/todo.model"
import { ITodo } from "~/types"

export default defineEventHandler(async (event) => {
    try {
        const body: ITodo = await readBody(event)
        if (!body) {
            return setResponse(event, { statusCode: 400, statusMessage: 'Item field is required.' })
        }
        await todoModel.create({ item: body.item })
        return setResponse(event, { statusCode: 200, statusMessage: 'New item has been added.' })
    } catch (error: unknown) {
        if (error instanceof Error.ValidationError) {
            return setResponse(event, { statusCode: 400, statusMessage: error.message })
        }
        return setResponse(event, { statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})