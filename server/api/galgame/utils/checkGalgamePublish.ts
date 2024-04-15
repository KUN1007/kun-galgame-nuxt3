import { isValidKunLanguage } from '~/utils/validate'
import { VNDBPattern } from '~/utils/pattern'

export const checkGalgamePublish = (
  vndb_id: string,
  name: KunLanguage,
  introduction: KunLanguage,
  aliases?: string[]
) => {
  if (!vndb_id.trim()) {
    return 10601
  }

  if (!VNDBPattern.test(vndb_id)) {
    return 10602
  }

  if (!isValidKunLanguage(name, 233)) {
    return 10603
  }

  if (!isValidKunLanguage(introduction, 100007)) {
    return 10606
  }

  if (!aliases) {
    return 0
  }

  if (aliases.length > 17) {
    return 10611
  }

  for (const alias of aliases) {
    if (alias.length > 107) {
      return 10612
    }
  }

  return 0
}
