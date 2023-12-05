import mongoose from 'mongoose'

export default async () => {
  try {
    const URL = useRuntimeConfig().MONGODB_URL
    await mongoose.connect(URL)
    console.log(`MongoDB: ${URL} connection successful! `)
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: `Mongoose connection error: ${error}`,
    })
  }
}
