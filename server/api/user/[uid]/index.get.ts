import UserModel from '~/server/models/user'
import type { UserInfo } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')
  console.log('uid', uid)

  if (!uid) {
    kunError(event, 10101)
    return
  }

  const uidNumber = parseInt(uid)

  if (uidNumber <= 0 && typeof uidNumber !== 'number') {
    kunError(event, 10114)
    return
  }

  const user = await UserModel.findOne({ uid })
  if (!user) {
    kunError(event, 10114)
    return
  }
  const responseData: UserInfo = {
    uid: user.uid,
    name: user.name,
    avatar: user.avatar,
    roles: user.roles,
    status: user.status,
    time: user.time,
    moemoepoint: user.moemoepoint,
    bio: user.bio,
    upvote: user.upvote,
    like: user.like,
    dislike: user.dislike,
    daily_topic_count: user.daily_topic_count,

    topic: user.topic,
    reply: user.reply,
    comment: user.comment,
    likeTopic: user.like_topic,
    upvoteTopic: user.upvote_topic,
  }
  return responseData
})
