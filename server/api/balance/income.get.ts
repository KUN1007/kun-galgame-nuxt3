import IncomeModel from '~/server/models/income'
import type {
  SortField,
  SortOrder,
  BalanceIncomeRequestData,
  BalanceIncome
} from '~/types/api/balance'

const getIncomes = async (
  page: number,
  limit: number,
  sortField: SortField,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc'
  }

  const incomeDetails = await IncomeModel.find()
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: BalanceIncome[] = incomeDetails.map((income) => ({
    iid: income.iid,
    reason: income.reason,
    time: income.time,
    amount: income.amount
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const { page, limit, sortField, sortOrder }: BalanceIncomeRequestData =
    await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    kunError(event, 10507)
    return
  }

  const topics = await getIncomes(
    parseInt(page),
    parseInt(limit),
    sortField as SortField,
    sortOrder as SortOrder
  )

  return topics
})
