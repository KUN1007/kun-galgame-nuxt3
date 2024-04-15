import type { GalgameStoreTemp } from '~/store/types/edit/galgame'

export const diffGalgame = (
  oldGalgame: GalgameStoreTemp,
  newGalgame: Partial<GalgameStoreTemp>
) => {
  const diffs: string[] = []

  const compareObjects = (
    obj1: Record<string, any>,
    obj2: Record<string, any>,
    path = ''
  ) => {
    for (const key in obj1) {
      const newPath = path ? `${path}.${key}` : key

      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        compareObjects(obj1[key], obj2[key], newPath)
      } else if (obj1[key] !== obj2[key]) {
        if (obj1[key] === undefined) {
          diffs.push(`${newPath}<br/><br/><b>${obj2[key]}</b>`)
        } else if (obj2[key] !== undefined && obj1[key] !== undefined) {
          diffs.push(
            `<h2>${newPath}</h2>${useDiff(obj2[key], obj1[key])}<br/><br/>`
          )
        }
      }
    }
  }

  compareObjects(
    {
      gid: oldGalgame.gid,
      name: oldGalgame.name,
      introduction: oldGalgame.introduction,
      alias: oldGalgame.alias,
      official: oldGalgame.official
    },
    newGalgame
  )

  return diffs.join('\n').replace(/\\/g, '')
}
