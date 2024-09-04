import type {
  EditCreateTopicRequestData,
  EditUpdateTopicRequestData
} from '~/types/api/topic'

const isEditUpdateTopicData = (data: any): data is EditUpdateTopicRequestData =>
  typeof data.tid !== 'undefined'

export const checkTopicPublish = (
  textCount: number,
  topicData: EditCreateTopicRequestData | EditUpdateTopicRequestData
): boolean => {
  if (isEditUpdateTopicData(topicData)) {
    if (!topicData.tid) {
      useMessage('Failed to resolve topic', '未能解析话题 ID', 'error')
      return false
    }
  }

  if (!topicData.title.trim()) {
    useMessage('Title cannot be empty!', '标题不可为空！', 'warn')
    return false
  }

  if (topicData.title.trim().length > 40) {
    useMessage(
      'Title maximum length is 40 characters!',
      '标题最大长度为 40 个字符！',
      'warn'
    )
    return false
  }

  // Solve the conflict between code mode and preview mode
  if (!textCount && !markdownToText(topicData.content).length) {
    useMessage('Content cannot be empty!', '内容不可为空！', 'warn')
    return false
  }

  if (textCount > 100007 || markdownToText(topicData.content).length > 100007) {
    useMessage(
      'Content maximum length is 100,007!',
      '内容最大长度为 100,007!',
      'warn'
    )
    return false
  }

  if (!topicData.tags.length) {
    useMessage('Please use at least one tag!', '请至少使用一个标签！', 'warn')
    return false
  }

  if (topicData.tags.length > 7) {
    useMessage('Reply with a maximum of 7 tags', '回复最多 7 个标签', 'warn')
    return false
  }

  for (const tag of topicData.tags) {
    if (tag.length > 17) {
      useMessage(
        'Single tag maximum length is 17 characters',
        '单个标签最长 17 个字符',
        'warn'
      )
      return false
    }
  }

  if (!topicData.category.length) {
    useMessage(
      'Please select at least one category!',
      '请至少选择一个分类！',
      'warn'
    )
    return false
  }

  if (topicData.category.length > 2) {
    useMessage(
      'Topic with a maximum of 2 categories!',
      '最多选择两个分类！',
      'warn'
    )
    return false
  }

  if (!topicData.section.length) {
    useMessage(
      'Please select at least one section!',
      '请至少选择一个分区！',
      'warn'
    )
    return false
  }

  if (topicData.category.length > 2) {
    useMessage(
      'Topic with a maximum of 2 sections!',
      '最多选择两个分区！',
      'warn'
    )
    return false
  }

  return true
}
