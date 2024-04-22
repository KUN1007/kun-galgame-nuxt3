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

  if (galgame.alias.length > 17) {
    useMessage(
      'The alias for visualnovel should be no more than 17 items!',
      'Galgame 的别名最多 17 个!',
      'warn'
    )
    return false
  }

  for (const alias of galgame.alias) {
    if (alias.length > 107) {
      useMessage(
        'The alias for visualnovel should be no longer than 107 characters!',
        'Galgame 的别名最长 107 字!',
        'warn'
      )
      return false
    }
  }

  if (galgame.official.trim().length > 233) {
    useMessage(
      'The maximum length of the official link is 233 characters!',
      '官网链接最大长度为 233 字!',
      'warn'
    )
    return false
  }

  for (const e of galgame.engine) {
    if (e.length > 107) {
      useMessage(
        'The engine name for visualnovel should be no longer than 107 characters!',
        'Galgame 的引擎名最长 107 字!',
        'warn'
      )
      return false
    }
  }

  return true
}
