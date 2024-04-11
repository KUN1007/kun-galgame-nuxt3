import GalgameHistoryModel from '../models/galgame-history'
import type { CreateGalgameHistoryRequestData } from '~/types/api/galgame-history'

export const createGalgameHistory = async (
  history: CreateGalgameHistoryRequestData
) => {
  await GalgameHistoryModel.create({
    ...history
  })
}

export const compareGalgameChanges = (str1: string, str2: string) => {
  return str1
    .split('')
    .reduce((result: string[], char, index) => {
      if (char !== str2[index]) {
        result.push(`${char} => ${str2[index]}`)
      }
      return result
    }, [])
    .toString()
}
