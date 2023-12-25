export const checkCommentPublish = (content: string) => {
  if (!content.trim()) {
    useMessage('Comment content cannot be empty!', '评论内容不能为空！', 'warn')
    return false
  }

  if (content.trim().length > 1007) {
    useMessage(
      'The maximum length for comments should not exceed 1007 characters.',
      '评论最大长度不可超过 1007 个字符',
      'warn'
    )
    return false
  }

  return true
}
