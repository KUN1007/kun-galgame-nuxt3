import { reportSection } from '~/pages/report/constant'
import ReportModel from '~/server/models/report'

import type { ReportSubmitRequestData } from '~/types/api/report'

export default defineEventHandler(async (event) => {
  const { reason, reportType }: ReportSubmitRequestData = await readBody(event)

  if (!reportSection.includes(reportType)) {
    return kunError(event, 10701)
  }
  if (!reason) {
    return kunError(event, 10702)
  }

  ReportModel.create({
    reason,
    reportType
  })

  return 'Submit report successfully!'
})
