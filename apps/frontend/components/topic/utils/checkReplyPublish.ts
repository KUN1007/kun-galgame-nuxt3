export const checkReplyPublish = (tags: string[], content: string) => {
  if (tags.length > 7) {
    useMessage(10245, 'warn')
    return false
  }

  for (const tag of tags) {
    if (tag.length > 17) {
      useMessage(10246, 'warn')
      return false
    }
  }

  if (!content.trim()) {
    useMessage(10247, 'warn')
    return false
  }

  if (content.length > 10007) {
    useMessage(10248, 'warn')
    return false
  }

  return true
}
