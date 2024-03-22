import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import type { TodoAttributes } from './types/todo'

const TodoSchema = new mongoose.Schema<TodoAttributes>(
  {
    todo_id: { type: Number, unique: true },
    status: { type: Number, default: 0 },
    content_en_us: { type: String, require: true },
    content_zh_cn: { type: String, require: true },
    creator: { type: String, require: true },
    creator_id: { type: Number, require: true },
    time: { type: Number, default: Date.now() },
    completer: { type: String, require: true },
    completer_id: { type: Number, require: true },
    completed_time: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

TodoSchema.pre('save', increasingSequence('todo_id'))

const TodoModel = mongoose.model<TodoAttributes>('todo', TodoSchema)

export default TodoModel
