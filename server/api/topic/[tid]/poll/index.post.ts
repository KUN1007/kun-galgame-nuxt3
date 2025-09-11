import prisma from '~/prisma/prisma'
import { createPollSchema } from '~/validations/topic-poll'
import type { TopicPoll } from '~/types/api/topic-poll'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)
  if (!userInfo) {
    return kunError(event, '用户登录失效')
  }

  const input = await kunParsePostBody(event, createPollSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const topic = await prisma.topic.findUnique({
    where: { id: input.topic_id }
  })
  if (!topic) {
    return kunError(event, '话题不存在')
  }
  if (topic.user_id !== userInfo.uid && userInfo.role < 2) {
    return kunError(event, '您没有权限在此话题下创建投票')
  }

  return prisma.$transaction(async (prisma) => {
    const { options, ...rest } = input
    const poll = await prisma.topic_poll.create({
      data: {
        ...rest,
        deadline: rest.deadline ? new Date(rest.deadline) : null,
        user_id: userInfo.uid
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    const createdOptions = await prisma.topic_poll_option.createManyAndReturn({
      data: options.map((opt) => ({
        text: opt.text,
        poll_id: poll.id
      }))
    })

    const res: TopicPoll = {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      min_choice: poll.min_choice,
      max_choice: poll.max_choice,
      deadline: poll.deadline,
      type: poll.type,
      status: poll.status,
      result_visibility: poll.result_visibility,
      is_anonymous: poll.is_anonymous,
      can_change_vote: poll.can_change_vote,
      topic_id: poll.topic_id,
      user: poll.user,
      option: createdOptions.map((opt) => ({
        id: opt.id,
        text: opt.text,
        vote_count: 0,
        is_voted: false
      })),
      voters: [],
      voters_count: 0,
      vote_count: 0,
      created: poll.created,
      updated: poll.updated
    }

    return res
  })
})
