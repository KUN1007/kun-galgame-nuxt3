import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
  const storage = useStorage()
  const config = useRuntimeConfig()

  const driver = redisDriver({
    host: config.REDIS_HOST,
    port: parseInt(config.REDIS_PORT)
  })

  storage.mount('redis', driver)
  console.log(
    `redis: ${config.REDIS_HOST}:${config.REDIS_PORT} connection successful! `
  )
})
