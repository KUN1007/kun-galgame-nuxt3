export const checkGalgamePublish = (
  vndbId: string,
  name: KunLanguage,
  banner: Blob | null,
  introduction: KunLanguage
): boolean => {
  if (!vndbId.trim()) {
    useMessage(10518, 'warn')
    return false
  }

  if (!VNDBPattern.test(vndbId)) {
    useMessage(10520, 'warn')
    return false
  }

  if (!isValidKunLanguage(name, 233)) {
    useMessage(10521, 'warn')
    return false
  }

  if (!banner) {
    useMessage(10522, 'warn')
    return false
  }

  if (banner.size > 1007 * 1024) {
    useMessage(10523, 'warn')
    return false
  }

  if (!isValidKunLanguage(introduction, 100007)) {
    useMessage(10524, 'warn')
    return false
  }

  return true
}
