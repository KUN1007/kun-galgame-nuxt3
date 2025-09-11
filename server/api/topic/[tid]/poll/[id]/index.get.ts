import prisma from '~/prisma/prisma'
import { getPollByTopicSchema } from '~/validations/topic-poll'
import type { TopicPoll } from '~/types/api/topic-poll'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)

  const input = kunParseGetQuery(event, getPollByTopicSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const polls = await prisma.topic_poll.findMany({
    where: { topic_id: input.topic_id },
    include: {
      option: {
        include: {
          _count: {
            select: { vote: true }
          },

          vote: {
            where: {
              user_id: userInfo?.uid
            },
            select: {
              id: true
            }
          }
        }
      },
      vote: {
        take: 5,
        distinct: ['user_id'],
        orderBy: { created: 'desc' },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      },
      user: { select: { id: true, name: true, avatar: true } },
      _count: {
        select: {
          vote: true
        }
      }
    }
  })
  if (!polls.length) {
    return []
  }

  const formatePolls: TopicPoll[] = polls.map((poll) => {
    const isUserVoted = poll.option.some((opt) => opt.vote.length > 0)

    let showResults = false
    const now = new Date()

    if (
      userInfo?.uid === poll.user_id ||
      (userInfo?.role && userInfo?.role > 1)
    ) {
      showResults = true
    }

    switch (poll.result_visibility) {
      case 'always':
        showResults = true
        break
      case 'after_vote':
        if (isUserVoted) {
          showResults = true
        }
        break
      case 'after_deadline':
        if (
          poll.status === 'closed' ||
          (poll.deadline ? poll.deadline < now : false)
        ) {
          showResults = true
        }
        break
    }

    const voters = poll.vote.map((v) => v.user)

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
      option: poll.option.map((opt) => ({
        id: opt.id,
        text: opt.text,
        vote_count: showResults ? opt._count.vote : null,
        is_voted: opt.vote.length > 0
      })),
      voters: voters,
      voters_count: poll._count.vote,
      vote_count: showResults ? poll._count.vote : null,
      created: poll.created,
      updated: poll.updated
    }

    return res
  })

  return formatePolls
})
