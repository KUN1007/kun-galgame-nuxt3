import UpdateLogModel from '~/server/models/update-log'
import type { UpdateLogRequestData, UpdateLog } from '~/types/api/update-log'

const getUpdateLogs = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  const updateLogs = await UpdateLogModel.find()
    .sort({ upid: -1 })
    .skip(skip)
    .limit(limit)

  const data: UpdateLog[] = updateLogs.map((log) => ({
    upid: log.upid,
    description: log.description,
    time: log.time,
    version: log.version
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { page, limit }: UpdateLogRequestData = await getQuery(event)
  if (!page || !limit) {
    kunError(event, 10507)
    return
  }

  const topics = await getUpdateLogs(parseInt(page), parseInt(limit))

  return topics
})
