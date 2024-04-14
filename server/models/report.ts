import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'
import type { ReportAttributes } from './types/report'

const ReportSchema = new mongoose.Schema<ReportAttributes>(
  {
    report_id: { type: Number, unique: true },
    reason: { type: String, default: '' },
    type: { type: String, default: '' },
    status: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

ReportSchema.pre('save', increasingSequence('report_id'))

const ReportModel = mongoose.model<ReportAttributes>('report', ReportSchema)

export default ReportModel
