import prisma from '~/prisma/prisma'
import { getReplySchema } from '~/validations/topic'
import { markdownToText } from '~/utils/markdownToText'
import type { z } from 'zod'
import type { TopicReply } from '~/types/api/topic-reply'
import type { TopicComment } from '~/types/api/topic-comment'

const getTopicReplies = async (
  input: z.infer<typeof getReplySchema>,
  uid?: number
) => {
  const { topicId, page, limit, sortOrder } = input
  const skip = (page - 1) * limit

  const repliesData = await prisma.topic_reply.findMany({
    skip,
    take: limit,
    where: {
      topic_id: topicId
    },
    orderBy: {
      floor: sortOrder
    },
    include: {
      user: {
        select: { id: true, name: true, avatar: true, moemoepoint: true }
      },
      target: {
        orderBy: {
          target_reply: { floor: 'asc' }
        },
        select: {
          content: true,
          target_reply: {
            select: {
              id: true,
              floor: true,
              content: true,
              user: {
                select: { id: true, name: true, avatar: true }
              }
            }
          }
        }
      },

      _count: {
        select: { like: true, dislike: true, comment: true }
      },
      like: { where: { user_id: uid } },
      dislike: { where: { user_id: uid } },
      comment: {
        orderBy: { created: 'asc' },
        include: {
          user: {
            select: { id: true, name: true, avatar: true }
          },
          target_user: {
            select: { id: true, name: true, avatar: true }
          },
          _count: {
            select: { like: true }
          },
          like: {
            where: { user_id: uid }
          }
        }
      }
    }
  })

  const replies: TopicReply[] = await Promise.all(
    repliesData.map(async (reply) => {
      const comments: TopicComment[] = reply.comment.map((comment) => ({
        id: comment.id,
        replyId: comment.topic_reply_id,
        topicId: comment.topic_id,
        user: comment.user,
        toUser: comment.target_user,
        content: comment.content,
        isLiked: comment.like.length > 0,
        likeCount: comment._count.like,
        created: comment.created
      }))

      const targets = await Promise.all(
        reply.target.map(async (targetRelation) => {
          const targetReply = targetRelation.target_reply
          const contentText = markdownToText(targetReply.content)
          return {
            id: targetReply.id,
            floor: targetReply.floor,
            user: targetReply.user,
            contentPreview:
              contentText.slice(0, 150) +
              (contentText.length > 150 ? '...' : ''),
            replyContentMarkdown: targetRelation.content,
            replyContentHtml: await markdownToHtml(targetRelation.content)
          }
        })
      )

      return {
        id: reply.id,
        topicId: reply.topic_id,
        floor: reply.floor,
        user: reply.user,
        edited: reply.edited,
        contentMarkdown: reply.content,
        contentHtml: await markdownToHtml(reply.content),
        likeCount: reply._count.like,
        isLiked: reply.like.length > 0,
        dislikeCount: reply._count.dislike,
        isDisliked: reply.dislike.length > 0,
        comment: comments,
        created: reply.created,
        targets: targets
      }
    })
  )

  return replies
}

export default defineEventHandler(async (event) => {
  const input = kunParseGetQuery(event, getReplySchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const userInfo = await getCookieTokenInfo(event)

  const result = await getTopicReplies(input, userInfo?.uid)

  return result
})
