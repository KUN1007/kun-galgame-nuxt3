import NonMoeModel from '~/server/models/non-moe'
import type { NonMoeLogRequestData, NonMoeLog } from '~/types/api/non-moe'

const getNonMoeLogs = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  const total = await NonMoeModel.countDocuments()
  const data = await NonMoeModel.find()
    .sort({ nid: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const logs: NonMoeLog[] = data.map((log) => ({
    nid: log.nid,
    uid: log.uid,
    name: log.name,
    description: log.description,
    time: log.created,
    result: log.result
  }))

  return { logs, total }
}

export default defineEventHandler(async (event) => {
  const { page, limit }: NonMoeLogRequestData = await getQuery(event)
  if (!page || !limit) {
    return kunError(event, 10507)
  }
  if (limit !== '30') {
    return kunError(event, 10209)
  }

  const topics = await getNonMoeLogs(parseInt(page), parseInt(limit))

  return topics
})
