import UserModel from '~/server/models/user'
import type { UserInfo } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')
  if (!uid) {
    return kunError(event, 10101)
  }

  const uidNumber = parseInt(uid)
  if (uidNumber <= 0 && typeof uidNumber !== 'number') {
    return kunError(event, 10114)
  }

  const user = await UserModel.findOne({ uid })
  if (!user) {
    return kunError(event, 10114)
  }

  if (user.status === 1) {
    return 'banned'
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

    reply: user.reply.length,
    comment: user.comment.length,

    topic: user.topic.length,
    likeTopic: user.like_topic.length,
    upvoteTopic: user.upvote_topic.length,
    favoriteTopic: user.favorite_topic.length,

    galgame: user.galgame.length,
    likeGalgame: user.like_galgame.length,
    favoriteGalgame: user.favorite_galgame.length,
    contributeGalgame: user.contribute_galgame.length,

    dailyTopicCount: user.daily_topic_count,
    dailyGalgameCount: user.daily_galgame_count
  }
  return responseData
})
