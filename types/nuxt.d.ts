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
    KUN_GALGAME_URL: string
    KUN_VISUAL_NOVEL_FORUM_YANDEX_VERIFICATION: string
    KUN_VISUAL_NOVEL_VERSION: string
  }
}

export {}
