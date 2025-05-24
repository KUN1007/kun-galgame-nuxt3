import { isValidKunLanguage } from '~/utils/validate'
import { VNDBPattern } from '~/utils/pattern'

export const checkGalgamePublish = (
  vndb_id: string,
  name: KunLanguage,
  introduction: KunLanguage,
  contentLimit: string,
  series: string[],
  aliases: string[],
  official: string[],
  engine: string[],
  tags: string[]
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

  if (!['sfw', 'nsfw'].includes(contentLimit)) {
    return 10647
  }

  if (aliases.length > 17) {
    return 10611
  }

  for (const alias of aliases) {
    if (alias.length > 500) {
      return 10612
    }
  }

  if (official.length > 17) {
    return 10637
  }

  for (const o of official) {
    if (o.trim().length > 233) {
      return 10629
    }
  }

  if (engine.length > 17) {
    return 10638
  }

  for (const e of engine) {
    if (e.trim().length > 107) {
      return 10635
    }
  }

  if (tags.length > 107) {
    return 10642
  }

  for (const t of tags) {
    if (t.trim().length > 50) {
      return 10643
    }
  }

  if (series.length > 50) {
    return 10645
  }

  for (const s of series) {
    if (!/^\d{1,6}$/.test(s)) {
      return 10646
    }
  }

  return 0
}
