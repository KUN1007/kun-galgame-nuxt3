import UpdateLogModel from '~/server/models/update-log'
import type {
  GetUpdateLogRequestData,
  UpdateType,
  UpdateLog
} from '~/types/api/update-log'

const getUpdateLogs = async (
  page: number,
  limit: number,
  language: Language
) => {
  const skip = (page - 1) * limit

  const updateLogs = await UpdateLogModel.find()
    .sort({ upid: -1 })
    .skip(skip)
    .limit(limit)

  const data: UpdateLog[] = updateLogs.map((log) => ({
    upid: log.upid,
    type: log.type as UpdateType,
    content: language === 'en-us' ? log.content_en_us : log.content_zh_cn,
    time: log.time,
    version: log.version
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit, language }: GetUpdateLogRequestData =
    await getQuery(event)
  if (!page || !limit) {
    kunError(event, 10507)
    return
  }

  const topics = await getUpdateLogs(parseInt(page), parseInt(limit), language)

  return topics
})
