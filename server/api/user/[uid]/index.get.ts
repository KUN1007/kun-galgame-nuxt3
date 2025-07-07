import prisma from '~/prisma/prisma'
import { getUserInfoSchema } from '~/validations/user'
import { subDays } from 'date-fns'
import type { UserInfo } from '~/types/api/user'

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getUserInfoSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }
  const uid = input.userId

  const user = await prisma.user.findUnique({
    where: { id: uid },
    include: {
      galgame: {
        where: {
          created: {
            gte: subDays(new Date(), 1)
          }
        }
      },
      topic: {
        where: {
          created: {
            gte: subDays(new Date(), 1)
          }
        }
      },
      // User received upvotes
      topic_upvote: { where: { user_id: uid } },
      // User received likes
      topic_like: { where: { user_id: uid } },
      reply_like: { where: { user_id: uid } },
      comment_like: { where: { user_id: uid } },
      galgame_like: { where: { user_id: uid } },
      galgame_comment_like: { where: { user_id: uid } },
      galgame_resource_like: { where: { user_id: uid } },
      // User received favorites
      topic_favorite: { where: { user_id: uid } },
      galgame_favorite: { where: { user_id: uid } },
      // User received dislikes
      topic_dislike: { where: { user_id: uid } },
      reply_dislike: { where: { user_id: uid } },
      _count: {
        select: {
          reply_created: true,
          comment_created: true,
          topic: true,

          galgame: true,
          galgame_comment: true,
          galgame_pr: true,
          galgame_link: true,
          galgame_contributor: true,

          galgame_resource: true
        }
      }
    }
  })
  if (!user) {
    return kunError(event, '未找到该用户')
  }
  if (user.status === 1) {
    return 'banned'
  }

  const likes =
    user.topic_like.length +
    user.reply_like.length +
    user.comment_like.length +
    user.galgame_like.length +
    user.galgame_comment_like.length +
    user.galgame_resource_like.length
  const dislikes = user.topic_dislike.length + user.reply_dislike.length
  const favorites = user.topic_favorite.length + user.galgame_favorite.length

  const responseData: UserInfo = {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    role: user.role,
    status: user.status,
    moemoepoint: user.moemoepoint,
    bio: user.bio,
    created: user.created,

    upvote: user.topic_upvote.length,
    like: likes,
    dislike: dislikes,
    favorite: favorites,

    replyCreated: user._count.reply_created,
    commentCreated: user._count.comment_created,
    topic: user._count.topic,

    galgame: user._count.galgame,
    galgameComment: user._count.galgame_comment,
    galgamePr: user._count.galgame_pr,
    galgameLink: user._count.galgame_link,
    contributeGalgame: user._count.galgame_contributor,

    galgameResource: user._count.galgame_resource,

    dailyTopicCount: user.topic.length,
    dailyGalgameCount: user.galgame.length
  }
  return responseData
})
