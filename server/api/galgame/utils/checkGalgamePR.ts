import { isValidKunLanguage } from '~/utils/validate'
import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export const checkGalgamePR = (galgame: GalgameStoreTemp) => {
  if (typeof galgame.gid !== 'number' || galgame.gid > 1000007) {
    return
  }

  if (!isValidKunLanguage(galgame.name, 233)) {
    return 10603
  }

  if (!isValidKunLanguage(galgame.introduction, 100007)) {
    return 10606
  }

  if (galgame.alias.length > 17) {
    return 10611
  }

  for (const alias of galgame.alias) {
    if (alias.length > 107) {
      return 10612
    }
  }

  if (galgame.official.trim().length > 233) {
    return 10629
  }

  return 0
}
