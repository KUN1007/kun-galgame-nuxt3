export const checkReplyPublish = (content: string) => {
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
