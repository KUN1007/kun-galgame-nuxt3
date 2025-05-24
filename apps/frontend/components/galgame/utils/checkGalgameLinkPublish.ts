export const checkGalgameLinkPublish = (name: string, link: string) => {
  if (!name.trim()) {
    useMessage(10551, 'warn')
    return false
  }

  if (!link.trim()) {
    useMessage(10552, 'warn')
    return false
  }

  if (!isValidURL(link.trim())) {
    useMessage(10553, 'warn')
    return false
  }

  if (name.trim().length > 107) {
    useMessage(10554, 'warn')
    return false
  }

  if (link.trim().length > 233) {
    useMessage(10555, 'warn')
    return false
  }

  return true
}
