import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export const checkGalgamePR = (galgame: GalgameStoreTemp): boolean => {
  if (!isValidKunLanguage(galgame.name, 233)) {
    useMessage(10506, 'warn')
    return false
  }

  if (!isValidKunLanguage(galgame.introduction, 100007)) {
    useMessage(10507, 'warn')
    return false
  }

  if (galgame.alias.length > 17) {
    useMessage(10508, 'warn')
    return false
  }

  for (const alias of galgame.alias) {
    if (alias.length > 107) {
      useMessage(10509, 'warn')
      return false
    }
  }

  if (galgame.official.length > 17) {
    useMessage(10510, 'warn')
    return false
  }

  for (const o of galgame.official) {
    if (o.trim().length > 233) {
      useMessage(10511, 'warn')
      return false
    }
  }

  if (galgame.engine.length > 17) {
    useMessage(10512, 'warn')
    return false
  }

  for (const e of galgame.engine) {
    if (e.length > 107) {
      useMessage(10513, 'warn')
      return false
    }
  }

  if (galgame.tags.length > 107) {
    useMessage(10514, 'warn')
    return false
  }

  for (const t of galgame.tags) {
    if (t.length > 107) {
      useMessage(10515, 'warn')
      return false
    }
  }

  if (galgame.series.length > 50) {
    useMessage(10516, 'warn')
    return false
  }

  for (const s of galgame.series) {
    if (!/^\d{1,6}$/.test(s)) {
      useMessage(10517, 'warn')
      return false
    }
  }

  return true
}
