import NonMoeModel from '~/server/models/non-moe'
import type { NonMoeLogRequestData, NonMoeLog } from '~/types/api/non-moe'

const getNonMoeLogs = async (
  page: number,
  limit: number,
  language: Language
) => {
  const skip = (page - 1) * limit

  const nonMoeLogs = await NonMoeModel.find()
    .sort({ nid: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: NonMoeLog[] = nonMoeLogs.map((log) => ({
    nid: log.nid,
    uid: log.uid,
    name: log.name,
    description:
      language === 'en-us'
        ? log.description['en-us']
        : log.description['zh-cn'],
    time: log.time,
    result: log.result
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, language }: NonMoeLogRequestData = await getQuery(event)
  if (!page || !limit || !language) {
    return kunError(event, 10507)
  }
  if (limit !== '4') {
    return kunError(event, 10209)
  }

  const topics = await getNonMoeLogs(parseInt(page), parseInt(limit), language)

  return topics
})
