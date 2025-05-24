import GalgameHistoryModel from '../models/galgame-history'
import type { CreateGalgameHistoryRequestData } from '~/types/api/galgame-history'

export const createGalgameHistory = async (
  history: CreateGalgameHistoryRequestData
) => {
  await GalgameHistoryModel.create({
    ...history
  })
}
