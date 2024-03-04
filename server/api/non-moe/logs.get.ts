import NonMoeModel from '~/server/models/non-moe'
import type {
  SortOrder,
  NonMoeLogRequestData,
  NonMoeLog
} from '~/types/api/non-moe'

const getNonMoeLogs = async (
  page: number,
  limit: number,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const nonMoeLogs = await NonMoeModel.find()
    .sort(sortOrder)
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: NonMoeLog[] = nonMoeLogs.map((log) => ({
    nid: log.nid,
    uid: log.uid,
    name: log.name,
    description: log.description,
    time: log.time,
    result: log.result
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortOrder }: NonMoeLogRequestData = await getQuery(event)
  if (!page || !limit || !sortOrder) {
    kunError(event, 10507)
    return
  }
  if (limit !== '30') {
    kunError(event, 10209)
    return
  }

  const topics = await getNonMoeLogs(parseInt(page), parseInt(limit), sortOrder)

  return topics
})
