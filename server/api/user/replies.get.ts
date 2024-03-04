import ReplyModel from '~/server/models/reply'
import type { UserReply } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const { ridArray } = getQuery(event)

  if (!ridArray) {
    return []
  }

  const replies = await ReplyModel.find({ rid: { $in: ridArray } }).limit(50)

  const responseData: UserReply[] = replies.map((reply) => ({
    tid: reply.tid,
    content: reply.content.substring(0, 107),
    time: reply.time
  }))
  return responseData
})
