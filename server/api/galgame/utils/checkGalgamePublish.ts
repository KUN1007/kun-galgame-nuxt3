import {
  isValid,
  VNDBPattern
} from '~/components/edit/utils/checkGalgamePublish'
import type { KunLanguage } from '~/types/i18n'

export const checkGalgamePublish = (
  vndb_id: string,
  name: KunLanguage,
  introduction: KunLanguage
) => {
  if (!vndb_id.trim()) {
    return 10601
  }

  if (!VNDBPattern.test(vndb_id)) {
    return 10602
  }

  if (!isValid(name, 107)) {
    return 10603
  }

  if (!isValid(introduction, 100007)) {
    return 10606
  }

  return 0
}
