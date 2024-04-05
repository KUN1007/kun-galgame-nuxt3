import {
  isValid,
  VNDBPattern
} from '~/components/edit/utils/checkGalgamePublish'
import type { KunLanguageFront } from '~/types/i18n'

export const checkGalgamePublish = (
  vndb_id: string,
  name: KunLanguageFront,
  banner: Blob,
  introduction: KunLanguageFront
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

  if (!banner) {
    return 10604
  }

  if (banner.size > 1007 * 1024) {
    return 10605
  }

  if (!isValid(introduction, 100007)) {
    return 10606
  }

  return 0
}
