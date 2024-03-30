import NonMoeModel from '~/server/models/non-moe'

const getNonMoeTotal = async () => {
  const nonMoeLogs = await NonMoeModel.find()
  return nonMoeLogs.length
}

export default defineEventHandler(async () => {
  const totalCount = await getNonMoeTotal()
  return totalCount
})
