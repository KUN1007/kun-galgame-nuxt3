import ExpenditureModel from '~/server/models/expenditure'
import type {
  SortField,
  SortOrder,
  BalanceExpenditureRequestData,
  BalanceExpenditure
} from '~/types/api/balance'

const getExpenditures = async (
  page: number,
  limit: number,
  sortField: SortField,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc'
  }

  const expenditureModelDetails = await ExpenditureModel.find()
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: BalanceExpenditure[] = expenditureModelDetails.map(
    (expenditure) => ({
      eid: expenditure.eid,
      reason: expenditure.reason,
      time: expenditure.time,
      amount: expenditure.amount
    })
  )

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder }: BalanceExpenditureRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    kunError(event, 10507)
    return
  }

  const topics = await getExpenditures(
    parseInt(page),
    parseInt(limit),
    sortField as SortField,
    sortOrder as SortOrder
  )

  return topics
})
