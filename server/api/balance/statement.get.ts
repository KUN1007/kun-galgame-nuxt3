import mongoose from 'mongoose'
import BalanceModel from '~/server/models/balance'
import type { PLStatement } from '~/types/api/balance'

export default defineEventHandler(async () => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const totalIncomeResult = await BalanceModel.aggregate([
      {
        $match: { type: 'income' }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' }
        }
      }
    ])

    const totalIncome: number =
      totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0

    const totalExpenditureResult = await BalanceModel.aggregate([
      {
        $match: { type: 'expenditure' }
      },
      {
        $group: {
          _id: null,
          totalExpenditure: { $sum: '$amount' }
        }
      }
    ])

    const totalExpenditure: number =
      totalExpenditureResult.length > 0
        ? totalExpenditureResult[0].totalExpenditure
        : 0

    const profitLoss = totalIncome - totalExpenditure

    const responseData: PLStatement = {
      totalIncome,
      totalExpenditure,
      profitLoss
    }

    await session.commitTransaction()

    return responseData
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
})
