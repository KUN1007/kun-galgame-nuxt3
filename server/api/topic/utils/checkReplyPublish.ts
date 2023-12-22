import { isValidTimestamp } from '@/utils/validate'

export const checkReplyPublish = (
  tags: string[],
  content: string,
  time: number
) => {
  if (tags.length > 7) {
    return 10501
  }

  for (const tag of tags) {
    if (tag.length > 17) {
      return 10502
    }
  }

  if (!content.trim()) {
    return 10503
  }

  if (content.length > 10007) {
    return 10504
  }

  if (!isValidTimestamp(time)) {
    return 10208
  }

  return 0
}
