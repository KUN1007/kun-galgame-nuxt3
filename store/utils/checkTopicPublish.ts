// Type guard to determine if EditUpdateTopicRequestData contains tid
const isEditUpdateTopicData = (data: any): data is EditUpdateTopicRequestData =>
  typeof data.tid !== 'undefined'

// Check if user input is valid when publishing
export const checkTopicPublish = (
  textCount: number,
  topicData: EditCreateTopicRequestData | EditUpdateTopicRequestData
): boolean => {
  // Check tid
  if (isEditUpdateTopicData(topicData)) {
    // Topic ID should not be zero
    if (!topicData.tid) {
      useMessage('Failed to resolve topic', '未能解析话题 ID', 'error')
      return false
    }
  }

  // Check title
  if (!topicData.title.trim()) {
    // If the title is empty, show a warning
    useMessage('Title cannot be empty!', '标题不可为空！', 'warn')
    return false
  }

  if (topicData.title.trim().length > 40) {
    // If the title is empty, show a warning
    useMessage(
      'Title maximum length is 40 characters!',
      '标题最大长度为 40 个字符！',
      'warn'
    )
    return false
  }

  // Check content character count
  if (!textCount) {
    // If the content is empty, show a warning
    useMessage('Content cannot be empty!', '内容不可为空！', 'warn')
    return false
  }

  if (textCount > 100007) {
    useMessage(
      'Content maximum length is 100007!',
      '内容最大长度为100007！',
      'warn'
    )
    return false
  }

  // Check tags
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

  // Check category
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

  // If all checks pass, return true
  return true
}
