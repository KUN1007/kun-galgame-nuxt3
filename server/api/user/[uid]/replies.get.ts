import UserModel from '~/server/models/user'
import ReplyModel from '~/server/models/reply'
import type { UserReply } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')
  if (!uid) {
    return kunError(event, 10101)
  }

  const { page, limit }: { page: string; limit: string } = await getQuery(event)
  if (!page || !limit) {
    return kunError(event, 10507)
  }
  if (limit !== '50') {
    return kunError(event, 10209)
  }
  const skip = (parseInt(page) - 1) * parseInt(limit)

  const user = await UserModel.findOne({ uid }).lean()
  if (!user) {
    return kunError(event, 10114)
  }

  const totalCount = await ReplyModel.countDocuments({
    rid: { $in: user.reply },
    status: { $ne: 1 }
  }).lean()
  const data = await ReplyModel.find({
    rid: { $in: user.reply },
    status: { $ne: 1 }
  })
    .sort({ created: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean()

  const replies: UserReply[] = data.map((reply) => ({
    tid: reply.tid,
    content: reply.content.substring(0, 107),
    time: reply.time
  }))
  return { replies, totalCount }
})
