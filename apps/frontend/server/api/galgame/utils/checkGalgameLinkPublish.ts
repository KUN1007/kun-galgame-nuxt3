import { isValidURL } from '~/utils/validate'

export const checkGalgameLinkPublish = (name: string, link: string) => {
  if (name.trim().length > 107) {
    return 10626
  }

  if (link.trim().length > 233) {
    return 10627
  }

  if (!isValidURL(link)) {
    return 10636
  }

  return 0
}
