import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export const checkGalgamePR = (galgame: GalgameStoreTemp): boolean => {
  if (!isValidKunLanguage(galgame.name, 233)) {
    useMessage(
      'Please enter at least one title, and ensure that the length of the title is not more than 107 characters!',
      '请输入至少一个标题, 并保证标题长度不多于 233 个字符!',
      'warn'
    )
    return false
  }

  if (!isValidKunLanguage(galgame.introduction, 100007)) {
    useMessage(
      'Please enter at least one introduction, and ensure that the length of the introduction is not more than 100,007 characters!',
      '请输入至少一个介绍, 并保证介绍长度不多于 100,007 个字符!',
      'warn'
    )
    return false
  }

  return true
}
