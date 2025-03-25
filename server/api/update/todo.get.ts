import TodoModel from '@/server/models/todo'
import type { GetTodoRequestData, Todo } from '@/types/api/update-log'

const getTodos = async (page: number, limit: number) => {
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
    content: todo.content,
    time: todo.time,
    completedTime: todo.completed_time
  }))

  return { todos, totalCount }
}

export default defineEventHandler(async (event) => {
  const { page, limit }: GetTodoRequestData = await getQuery(event)
  if (!page || !limit) {
    return kunError(event, 10507)
  }
  if (limit !== '10') {
    return kunError(event, 10209)
  }

  const todos = await getTodos(parseInt(page), parseInt(limit))

  return todos
})
