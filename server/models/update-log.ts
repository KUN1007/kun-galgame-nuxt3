import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import { UpdateLogAttributes } from './types/update-log'

const UpdateLogSchema = new mongoose.Schema<UpdateLogAttributes>(
  {
    upid: { type: Number, unique: true },
    description: { type: String, required: true, default: '' },
    language: { type: String, required: true, default: '' },
    time: { type: String, default: '' },
    version: { type: String, default: '' }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

UpdateLogSchema.pre('save', increasingSequence('upid'))

const UpdateLogModel = mongoose.model<UpdateLogAttributes>(
  'update_log',
  UpdateLogSchema
)

export default UpdateLogModel
