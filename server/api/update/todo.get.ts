import TodoModel from '~/server/models/todo'
import type { GetTodoRequestData, Todo } from '~/types/api/update-log'

const getTodos = async (page: number, limit: number, language: Language) => {
  const skip = (page - 1) * limit

  const findOptions = language ? { language } : {}

  const todos = await TodoModel.find(findOptions)
    .sort({ todo_id: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const data: Todo[] = todos.map((todo) => ({
    todoId: todo.todo_id,
    status: todo.status,
    content: todo.content,
    language: todo.language,
    time: todo.time,
    completedTime: todo.completed_time
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit, language }: GetTodoRequestData = await getQuery(event)
  if (!page || !limit) {
    kunError(event, 10507)
    return
  }

  const topics = await getTodos(parseInt(page), parseInt(limit), language)

  return topics
})
