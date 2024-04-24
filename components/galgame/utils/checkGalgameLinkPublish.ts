export const checkGalgameLinkPublish = (name: string, link: string) => {
  if (!name.trim()) {
    useMessage('Link name cannot be empty!', '链接名不可为空!', 'warn')
    return false
  }

  if (!link.trim()) {
    useMessage('Link cannot be empty!', '链接不可为空!', 'warn')
    return false
  }

  if (!isValidURL(link.trim())) {
    useMessage(
      'Invalid link format, link must be pure URL!',
      '非法的链接格式, 链接必须为纯 URL!',
      'warn'
    )
    return false
  }

  if (name.trim().length > 107) {
    useMessage(
      'The maximum length of the link name is 107 characters!',
      '链接名最大长度为 107 个字符!',
      'warn'
    )
    return false
  }

  if (link.trim().length > 233) {
    useMessage(
      'The maximum length of the link is 233 characters!',
      '链接最大长度为 233 个字符!',
      'warn'
    )
    return false
  }

  return true
}
