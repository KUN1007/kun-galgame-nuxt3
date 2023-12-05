declare module 'nuxt/schema' {
  interface RuntimeConfig {
    MONGODB_URL: string

    REDIS_HOST: string
    REDIS_PORT: string
  }

  interface PublicRuntimeConfig {
    KUN_GALGAME_URL: string
  }
}

export {}
