import type { KUNGalgamePayload } from '~/types/utils/jwt'

type PollForVisibilityCheck = {
  user_id: number
  // note: use string just for easy
  result_visibility: 'always' | 'after_vote' | 'after_deadline' | string
  status: string
  deadline: Date | null
}

export const canUserViewPollResults = (
  poll: PollForVisibilityCheck,
  userInfo: KUNGalgamePayload | null,
  isUserVoted: boolean
): boolean => {
  const isPrivilegedUser =
    (userInfo?.uid && userInfo.uid === poll.user_id) ||
    (userInfo?.role && userInfo.role > 1)
  if (isPrivilegedUser) {
    return true
  }

  const now = new Date()
  const isPollFinished =
    poll.status === 'closed' || (poll.deadline ? poll.deadline < now : false)

  switch (poll.result_visibility) {
    case 'always':
      return true
    case 'after_vote':
      return isUserVoted
    case 'after_deadline':
      return isPollFinished
    default:
      return false
  }
}
