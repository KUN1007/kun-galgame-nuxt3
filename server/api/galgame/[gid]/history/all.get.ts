import GalgameHistoryModel from '~/server/models/galgame-history'
import type {
  GalgameHistoryAction,
  GalgameHistoryType,
  GalgameHistory
} from '~/types/api/galgame-history'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    kunError(event, 10609)
    return
  }
  const { page, limit }: { page: string; limit: string } = await getQuery(event)
  if (!page || !limit) {
    kunError(event, 10507)
    return
  }
  if (limit !== '7') {
    kunError(event, 10209)
    return
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)
  const totalCount = await GalgameHistoryModel.countDocuments({ gid }).lean()

  const data = await GalgameHistoryModel.find({ gid })
    .sort({ time: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user', 'uid avatar name')
    .lean()

  const historyData: GalgameHistory[] = data.map((history) => ({
    gid: history.gid,
    time: history.time,
    action: history.action as GalgameHistoryAction,
    type: history.type as GalgameHistoryType,
    content: history.content,
    user: { ...history.user[0] }
  }))

  return { historyData, totalCount }
})
