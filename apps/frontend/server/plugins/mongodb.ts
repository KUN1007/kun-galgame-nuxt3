import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()
  const URL = config.MONGODB_URL

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(URL)
    console.log(`MongoDB: ${URL} connection successful!`)
  }

  nitroApp.hooks.hook('close', async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect()
      console.log('MongoDB connection closed.')
    }
  })
})
