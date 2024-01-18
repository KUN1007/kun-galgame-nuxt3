declare module 'nuxt/schema' {
  interface RuntimeConfig {
    MONGODB_URL: string
    KUN_GALGAME_API: string

    REDIS_HOST: string
    REDIS_PORT: string

    JWT_ISS: string
    JWT_AUD: string
    JWT_SECRET: string
  }

  interface PublicRuntimeConfig {
    DEV_HOST: string
    DEV_PORT: string
    DEV_SERVER: string

    KUN_GALGAME_URL: string
  }
}

export {}
