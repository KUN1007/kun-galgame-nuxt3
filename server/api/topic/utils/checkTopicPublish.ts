import { isValidTimestamp } from '@/utils/validate'

export const checkTopicPublish = (
  title: string,
  content: string,
  tags: string[],
  category: string[],
  edited: number
) => {
  if (!title.trim() || title.trim().length > 40) {
    return 10204
  }

  if (!content.trim() || content.trim().length > 100007) {
    return 10205
  }

  if (!tags.length || tags.length > 7) {
    return 10206
  }

  if (!category.length || category.length > 2) {
    return 10207
  }

  if (!isValidTimestamp(edited)) {
    return 10208
  }

  return 0
}
