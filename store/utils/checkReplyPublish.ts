export const checkReplyPublish = (tags: string[], content: string) => {
  if (tags.length > 7) {
    useMessage('Reply with a maximum of 7 tags', '回复最多 7 个标签', 'warn')
    return false
  }

  for (const tag of tags) {
    if (tag.length > 17) {
      useMessage(
        'Single tag maximum length is 17 characters',
        '单个标签最长 17 个字符',
        'warn'
      )
      return false
    }
  }

  if (!content.trim()) {
    useMessage('Reply content cannot be empty', '回复内容不可为空', 'warn')
    return false
  }

  if (content.length > 10007) {
    useMessage(
      'Reply maximum length is 10007 characters',
      '回复内容最大长度为 10007 个字符',
      'warn'
    )
    return false
  }

  return true
}
