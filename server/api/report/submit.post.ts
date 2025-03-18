import { reportSection } from '~/constants/report'
import ReportModel from '~/server/models/report'

import type { ReportSubmitRequestData } from '~/types/api/report'

export default defineEventHandler(async (event) => {
  const { reason, type }: ReportSubmitRequestData = await readBody(event)

  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, 10115, 205)
  }

  if (!reportSection.includes(type)) {
    return kunError(event, 10121)
  }
  if (!reason) {
    return kunError(event, 10122)
  }
  if (reason.trim().length > 1007) {
    return kunError(event, 10123)
  }

  await ReportModel.create({
    reason,
    type
  })

  return 'Moe Moe submit report successfully!'
})
