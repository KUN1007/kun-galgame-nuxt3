import type {
  EditCreateTopicRequestData,
  EditUpdateTopicRequestData
} from '~/types/api/topic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEditUpdateTopicData = (data: any): data is EditUpdateTopicRequestData =>
  typeof data.tid !== 'undefined'

export const checkTopicPublish = (
  textCount: number,
  topicData: EditCreateTopicRequestData | EditUpdateTopicRequestData
): boolean => {
  if (isEditUpdateTopicData(topicData)) {
    if (!topicData.tid) {
      useMessage(10203, 'error')
      return false
    }
  }

  if (!topicData.title.trim()) {
    useMessage(10204, 'warn')
    return false
  }

  if (topicData.title.trim().length > 40) {
    useMessage(10205, 'warn')
    return false
  }

  // Solve the conflict between code mode and preview mode
  if (!textCount && !markdownToText(topicData.content).length) {
    useMessage(10206, 'warn')
    return false
  }

  if (textCount > 100007 || markdownToText(topicData.content).length > 100007) {
    useMessage(10207, 'warn')
    return false
  }

  if (!topicData.tags.length) {
    useMessage(10208, 'warn')
    return false
  }

  if (topicData.tags.length > 7) {
    useMessage(10209, 'warn')
    return false
  }

  for (const tag of topicData.tags) {
    if (tag.length > 17) {
      useMessage(10210, 'warn')
      return false
    }
  }

  if (!topicData.category.length) {
    useMessage(10211, 'warn')
    return false
  }

  if (topicData.category.length > 2) {
    useMessage(10212, 'warn')
    return false
  }

  if (!topicData.section.length) {
    useMessage(10213, 'warn')
    return false
  }

  if (topicData.category.length > 2) {
    useMessage(10214, 'warn')
    return false
  }

  return true
}
