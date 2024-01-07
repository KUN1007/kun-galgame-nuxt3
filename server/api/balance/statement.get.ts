import mongoose from 'mongoose'
import IncomeModel from '~/server/models/income'
import ExpenditureModel from '~/server/models/expenditure'
import type { PLStatement } from '~/types/api/balance'

export default defineEventHandler(async (event) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const totalIncomeResult = await IncomeModel.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' },
        },
      },
    ])

    const totalExpenditureResult = await ExpenditureModel.aggregate([
      {
        $group: {
          _id: null,
          totalExpenditure: { $sum: '$amount' },
        },
      },
    ])

    const totalIncome: number =
      totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0
    const totalExpenditure: number =
      totalExpenditureResult.length > 0
        ? totalExpenditureResult[0].totalExpenditure
        : 0

    const profitLoss = totalIncome - totalExpenditure

    const responseData: PLStatement = {
      totalIncome,
      totalExpenditure,
      profitLoss,
    }

    await session.commitTransaction()
    session.endSession()

    return responseData
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
  }
})
