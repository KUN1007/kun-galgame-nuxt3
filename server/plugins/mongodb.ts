import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const URL = useRuntimeConfig().MONGODB_URL
  await mongoose.connect(URL)
  console.log(`MongoDB: ${URL} connection successful! `)
})
