import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { TodoAttributes } from './types/todo'

const TodoSchema = new mongoose.Schema<TodoAttributes>(
  {
    todo_id: { type: Number, unique: true },
    status: { type: Number, default: 0 },
    content: {
      'en-us': { type: String, default: '' },
      'ja-jp': { type: String, default: '' },
      'zh-cn': { type: String, default: '' }
    },
    time: { type: Number, default: Date.now() },
    completed_time: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

TodoSchema.pre('save', increasingSequence('todo_id'))

const TodoModel = mongoose.model<TodoAttributes>('todo', TodoSchema)

export default TodoModel
