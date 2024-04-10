import mongoose from 'mongoose'
import increasingSequence from '../utils/increasingSequence'

import type { ReportAttributes } from './types/report'

const ReportSchema = new mongoose.Schema<ReportAttributes>(
  {
    bid: { type: Number, unique: true },
    reason: { type: String, default: '' },
    reportType: { type: String, default: '' },
    reasolved: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

ReportSchema.pre('save', increasingSequence('bid'))

const ReportModel = mongoose.model<ReportAttributes>('report', ReportSchema)

export default ReportModel
