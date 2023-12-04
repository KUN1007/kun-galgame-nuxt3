import mongoose from 'mongoose'
import env from '@/config/config.dev'

// const DB_URL = `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_HOSTNAME}:${env.MONGO_PORT}/${env.DB_NAME}`
const DB_URL = `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`

// 创建连接
mongoose.connect(DB_URL)

// 连接成功
mongoose.connection.on('connected', () => {
  console.log(`MongoDB: ${DB_URL} connection successful! `)
})

// 连接错误
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err)
})

// 断开连接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

export default mongoose
