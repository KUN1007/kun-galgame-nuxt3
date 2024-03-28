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
      language === 'en-us' ? log.description_en_us : log.description_zh_cn,
    time: log.time,
    result: log.result
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, language }: NonMoeLogRequestData = await getQuery(event)
  if (!page || !limit || !language) {
    kunError(event, 10507)
    return
  }
  if (limit !== '30') {
    kunError(event, 10209)
    return
  }

  const topics = await getNonMoeLogs(parseInt(page), parseInt(limit), language)

  return topics
})
