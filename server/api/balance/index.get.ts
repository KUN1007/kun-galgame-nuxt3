import BalanceModel from '~/server/models/balance'
import type {
  SortField,
  SortOrder,
  BalanceType,
  BalanceRequestData,
  Balance
} from '~/types/api/balance'

const getBalanceData = async (
  page: number,
  limit: number,
  type: BalanceType,
  language: Language,
  sortField: SortField,
  sortOrder: SortOrder
) => {
  const skip = (page - 1) * limit

  const sortOptions: Record<string, 'asc' | 'desc'> = {
    [sortField]: sortOrder === 'asc' ? 'asc' : 'desc'
  }

  const data = await BalanceModel.find({ type })
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean()

  const responseData: Balance[] = data.map((balance) => ({
    bid: balance.bid,
    type: balance.type as BalanceType,
    reason: balance.reason[language],
    time: balance.time,
    amount: balance.amount
  }))

  return responseData
}

export default defineEventHandler(async (event) => {
  const {
    page,
    limit,
    type,
    language,
    sortField,
    sortOrder
  }: BalanceRequestData = await getQuery(event)
  if (!page || !limit || !sortField || !sortOrder) {
    return kunError(event, 10507)
  }

  const balanceData = await getBalanceData(
    parseInt(page),
    parseInt(limit),
    type,
    language,
    sortField as SortField,
    sortOrder as SortOrder
  )

  return balanceData
})
