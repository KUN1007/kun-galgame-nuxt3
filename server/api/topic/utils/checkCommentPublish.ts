export const checkCommentPublish = (content: string) => {
  if (!content.trim() || content.trim().length > 1007) {
    return 10223
  }

  return 0
}
