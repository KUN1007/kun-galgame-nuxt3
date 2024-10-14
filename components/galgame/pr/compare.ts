import type { GalgameDetail } from '~/types/api/galgame'
import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

interface Diffs {
  name: string
  value: string
}

export const diffGalgame = (
  oldGalgame: Partial<GalgameDetail>,
  newGalgame: Partial<GalgameStoreTemp>
) => {
  const diffs: Diffs[] = []

  const compareObjects = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj1: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj2: Record<string, any>,
    path = ''
  ) => {
    for (const key in obj1) {
      const newPath = path ? `${path}.${key}` : key

      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        compareObjects(obj1[key], obj2[key], newPath)
      } else if (obj1[key] !== obj2[key]) {
        if (obj1[key] === undefined) {
          diffs.push({
            name: newPath,
            value: `<b>${obj2[key]}</b>`
          })
        } else if (obj2[key] !== undefined && obj1[key] !== undefined) {
          diffs.push({
            name: newPath,
            value: `${useDiff(obj2[key], obj1[key])}`
          })
        }
      } else if (obj2[key] !== undefined) {
        diffs.push({
          name: newPath,
          value: `<i>${obj2[key]}</i>`
        })
      }
    }
  }

  compareObjects(
    {
      gid: oldGalgame.gid,
      name: oldGalgame.name,
      introduction: oldGalgame.markdown,
      alias: oldGalgame.alias?.toString(),
      official: oldGalgame.official?.toString(),
      engine: oldGalgame.engine?.toString(),
      tags: oldGalgame.tags?.toString(),
      series: oldGalgame.series?.toString()
    },
    {
      ...newGalgame,
      alias: newGalgame.alias?.toString(),
      official: newGalgame.official?.toString(),
      engine: newGalgame.engine?.toString(),
      tags: newGalgame.tags?.toString(),
      series: newGalgame.series?.toString()
    }
  )

  return diffs
}
