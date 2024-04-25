import { isValidURL } from '~/utils/validate'
import {
  typeOptions,
  languageOptions,
  platformOptions
} from '~/components/galgame/utils/options'
import { ResourceSizePattern } from '~/utils/pattern'
import type { GalgameResourceStoreTemp } from '~/store/types/galgame/resource'

export const checkGalgameResourcePublish = (link: GalgameResourceStoreTemp) => {
  if (!typeOptions.filter((item) => item !== 'all').includes(link.type)) {
    return 10613
  }

  if (!link.link.length || link.link.length > 107) {
    return 10614
  }

  for (const l of link.link) {
    if (l.trim().length > 1007) {
      return 10615
    }

    if (!isValidURL(l)) {
      return 10636
    }
  }

  if (
    !languageOptions.filter((item) => item !== 'all').includes(link.language)
  ) {
    return 10616
  }

  if (
    !platformOptions.filter((item) => item !== 'all').includes(link.platform)
  ) {
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
