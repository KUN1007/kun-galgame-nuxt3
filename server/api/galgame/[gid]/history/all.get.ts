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

  const data = await GalgameHistoryModel.find({ gid })
    .sort({ time: -1 })
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

  return historyData
})
