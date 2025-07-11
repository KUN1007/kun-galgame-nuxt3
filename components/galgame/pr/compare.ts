import type { updateGalgameSchema } from '~/validations/galgame'
import type { z } from 'zod'

interface Diffs {
  name: string
  value: string
}

export const diffGalgame = (
  oldGalgame?: z.infer<typeof updateGalgameSchema>,
  newGalgame?: z.infer<typeof updateGalgameSchema>
): Diffs[] => {
  const diffs: Diffs[] = []

  const oldData = {
    ...oldGalgame,
    alias: newGalgame?.aliases?.toString()
  }

  const newData = {
    ...newGalgame,
    alias: newGalgame?.aliases?.toString()
  }

  const allKeys = Object.keys({ ...oldData, ...newData })

  for (const key of allKeys) {
    const oldValue = oldData[key as keyof typeof oldData]
    const newValue = newData[key as keyof typeof newData]

    if (oldValue === newValue) {
      continue
    }

    if (oldValue === undefined && newValue !== undefined) {
      diffs.push({
        name: key,
        value: `<b>${newValue}</b>`
      })
    } else if (oldValue !== undefined && newValue === undefined) {
      diffs.push({
        name: key,
        value: `<del>${oldValue}</del>`
      })
    } else {
      diffs.push({
        name: key,
        value: `${useDiff(String(newValue), String(oldValue))}`
      })
    }
  }

  return diffs
}
