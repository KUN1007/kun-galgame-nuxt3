/*
 * redis 的配置文件
 * 该文件对 redis 进行了配置和封装，并对其实例进行了 promisify
 * 这样无需进行回调函数的处理，仅需 async / await 即可
 */

import Redis from 'ioredis'
import env from '@/config/config.dev'

// 创建单个 redis 客户端实例并 promisify
const redisClient = new Redis({
  port: parseInt(env.REDIS_PORT),
  host: env.REDIS_HOST,
})

// 监听 'ready' 事件
redisClient.on('connect', () => {
  console.log(
    `redis: ${env.REDIS_HOST}:${env.REDIS_PORT} connection successful! `
  )
})

redisClient.on('error', (error) => {
  console.error('Redis Client Error:', error)
})

// 创建值
const setValue = async (key: string, value: string, time?: number) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }

  try {
    if (time) {
      await redisClient.setex(key, time, value)
    } else {
      await redisClient.set(key, value)
    }
  } catch (error) {
    console.error('Error setting value in Redis:', error)
  }
}

// 获取值
const getValue = async (key: string) => {
  try {
    const value = await redisClient.get(key)
    return value
  } catch (error) {
    console.error('Error getting value from Redis:', error)
    return null
  }
}

// 示例：从 Redis 删除值
const delValue = async (key: string) => {
  try {
    await redisClient.del(key)
  } catch (error) {
    console.error('Error deleting value from Redis:', error)
  }
}

export { redisClient, setValue, getValue, delValue }
