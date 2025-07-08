// import redisDriver from 'unstorage/drivers/redis'

// export default defineNitroPlugin((nitroApp) => {
//   const storage = useStorage()
//   const config = useRuntimeConfig()

//   const driver = redisDriver({
//     host: config.REDIS_HOST,
//     port: parseInt(config.REDIS_PORT),
//     ttl: 0,
//     connectTimeout: 5000,
//     maxRetriesPerRequest: 1
//   })

//   storage.mount('redis', driver)
//   console.log(
//     `redis: ${config.REDIS_HOST}:${config.REDIS_PORT} connection successful!`
//   )

//   nitroApp.hooks.hook('close', async () => {
//     try {
//       await storage.unmount('redis')
//       console.log('Redis connection closed.')
//     } catch (error) {
//       console.error('Error closing Redis connection:', error)
//     }
//   })
// })
