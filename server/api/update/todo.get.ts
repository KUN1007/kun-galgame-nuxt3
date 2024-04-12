import TodoModel from '~/server/models/todo'
import type { GetTodoRequestData, Todo } from '~/types/api/update-log'

const getTodos = async (page: number, limit: number, language: Language) => {
  const skip = (page - 1) * limit
  const totalCount = await TodoModel.countDocuments().lean()

  const data = await TodoModel.find()
    .sort({ todo_id: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const todos: Todo[] = data.map((todo) => ({
    todoId: todo.todo_id,
    status: todo.status,
    content: language === 'en-us' ? todo.content_en_us : todo.content_zh_cn,
    time: todo.time,
    completedTime: todo.completed_time
  }))

  return { todos, totalCount }
}

export default defineEventHandler(async (event) => {
  const { page, limit, language }: GetTodoRequestData = await getQuery(event)
  if (!page || !limit) {
    kunError(event, 10507)
    return
  }
  if (limit !== '10') {
    kunError(event, 10209)
    return
  }

  const todos = await getTodos(parseInt(page), parseInt(limit), language)

  return todos
})
