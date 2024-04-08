import {
  typeOptions,
  languageOptions,
  platformOptions
} from '~/components/galgame/utils/options'
import { ResourceSizePattern } from '~/utils/pattern'
import type { GalgameResourceStorePersist } from '~/store/types/galgame/resource'

export const checkGalgameResourcePublish = (
  link: GalgameResourceStorePersist
) => {
  if (!typeOptions.includes(link.type)) {
    return 10613
  }

  if (!link.link.trim()) {
    return 10614
  }

  if (link.link.length > 1007) {
    return 10615
  }

  if (!languageOptions.includes(link.language)) {
    return 10616
  }

  if (!platformOptions.includes(link.platform)) {
    return 10617
  }

  if (!ResourceSizePattern.test(link.size)) {
    return 10618
  }

  if (link.code.length > 1007) {
    return 10619
  }

  if (link.password.length > 1007) {
    return 10620
  }

  if (link.note.length > 1007) {
    return 10621
  }

  return 0
}
