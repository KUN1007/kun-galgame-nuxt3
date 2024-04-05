import type { KunLanguageFront } from '~/types/i18n'

export const isValid = (i18nField: KunLanguageFront) => {
  const valid = /^(?=.*[^\s]).{1,107}$/
  return Object.values(i18nField).some((value) => valid.test(value))
}

export const VNDBPattern: RegExp = /^v\d{1,6}$/

export const checkGalgamePublish = (
  vndbId: string,
  name: KunLanguageFront,
  banner: Blob | null,
  introduction: KunLanguageFront
): boolean => {
  if (!vndbId.trim()) {
    useMessage('VNDB ID cannot be empty!', 'VNDB ID 不可为空!', 'warn')
    return false
  }

  if (!VNDBPattern.test(vndbId)) {
    useMessage(
      'Please enter the correct format of VNDB ID!',
      '请输入正确格式的 VNDB ID!',
      'warn'
    )
    return false
  }

  if (!isValid(name)) {
    useMessage(
      'Please enter at least one title, and ensure that the length of the title is not more than 107 characters!',
      '请输入至少一个标题, 并保证标题长度不多于 107 个字符!',
      'warn'
    )
    return false
  }

  if (!banner) {
    useMessage(
      'You must upload a visualnovel preview image!',
      '您必须上传一张 Galgame 预览图!',
      'warn'
    )
    return false
  }

  if (banner.size > 1007 * 1024) {
    useMessage('VNDB ID cannot be empty!', '预览图大小不能超过 1007KB!', 'warn')
    return false
  }

  if (!isValid(introduction)) {
    useMessage(
      'Please enter at least one introduction, and ensure that the length of the introduction is not more than 100,007 characters.!',
      '请输入至少一个介绍, 并保证介绍长度不多于 100,007 个字符!',
      'warn'
    )
    return false
  }

  return true
}
