export const checkGalgamePublish = (
  vndbId: string,
  name: KunLanguage,
  banner: Blob | null,
  introduction: KunLanguage,
  series: string[],
  aliases: string[],
  official: string[],
  engine: string[],
  tags: string[]
): boolean => {
  if (!vndbId.trim()) {
    useMessage(10518, 'warn')
    return false
  }

  if (!VNDBPattern.test(vndbId)) {
    useMessage(10520, 'warn')
    return false
  }

  if (!isValidKunLanguage(name, 233)) {
    useMessage(10521, 'warn')
    return false
  }

  if (!banner) {
    useMessage(10522, 'warn')
    return false
  }

  if (banner.size > 1007 * 1024) {
    useMessage(10523, 'warn')
    return false
  }

  if (!isValidKunLanguage(introduction, 100007)) {
    useMessage(10524, 'warn')
    return false
  }

  if (aliases.length > 17) {
    useMessage(10508, 'warn')
    return false
  }

  for (const alias of aliases) {
    if (alias.length > 500) {
      useMessage(10509, 'warn')
      return false
    }
  }

  if (official.length > 17) {
    useMessage(10510, 'warn')
    return false
  }

  for (const o of official) {
    if (o.trim().length > 233) {
      useMessage(10511, 'warn')
      return false
    }
  }

  if (engine.length > 17) {
    useMessage(10512, 'warn')
    return false
  }

  for (const e of engine) {
    if (e.length > 107) {
      useMessage(10513, 'warn')
      return false
    }
  }

  if (tags.length > 107) {
    useMessage(10514, 'warn')
    return false
  }

  for (const t of tags) {
    if (t.length > 107) {
      useMessage(10515, 'warn')
      return false
    }
  }

  if (series.length > 50) {
    useMessage(10516, 'warn')
    return false
  }

  for (const s of series) {
    if (!/^\d{1,6}$/.test(s)) {
      useMessage(10517, 'warn')
      return false
    }
  }

  return true
}
