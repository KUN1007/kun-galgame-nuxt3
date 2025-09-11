import prisma from '~/prisma/prisma'
import { getPollDetailSchema } from '~/validations/topic-poll'

export default defineEventHandler(async (event) => {
  const userInfo = await getCookieTokenInfo(event)

  const input = kunParseGetQuery(event, getPollDetailSchema)
  if (typeof input === 'string') {
    return kunError(event, input)
  }

  const poll = await prisma.topic_poll.findUnique({
    where: { id: input.poll_id },
    include: {
      option: {
        include: {
          _count: {
            select: { vote: true }
          }
        }
      },
      user: { select: { id: true, name: true, avatar: true } }
    }
  })

  if (!poll) {
    return kunError(event, '投票不存在')
  }

  let userVote: number[] = []
  if (userInfo) {
    const votes = await prisma.topic_poll_vote.findMany({
      where: {
        poll_id: input.poll_id,
        user_id: userInfo.uid
      },
      select: { option_id: true }
    })
    userVote = votes.map((v) => v.option_id)
  }

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
      showResults = userVote.length > 0
      break
    case 'after_deadline':
      showResults =
        poll.status === 'closed' ||
        (poll.deadline ? poll.deadline < now : false)
      break
  }

  const totalVotesCount = await prisma.topic_poll_vote.count({
    where: { poll_id: input.poll_id }
  })
  const totalVotersCount = await prisma.topic_poll_vote
    .groupBy({
      by: ['user_id'],
      where: { poll_id: input.poll_id },
      _count: { user_id: true }
    })
    .then((res) => res.length)

  return {
    ...poll,
    option: poll.option.map((opt) => ({
      id: opt.id,
      text: opt.text,
      vote_count: showResults ? opt._count.vote : null
    })),
    user_vote: userVote,
    show_results: showResults,
    total_votes_count: showResults ? totalVotesCount : null,
    total_voters_count: showResults ? totalVotersCount : null
  }
})
