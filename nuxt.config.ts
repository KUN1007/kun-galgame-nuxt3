// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 1007,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt',
    '@nuxtjs/robots',
    '@formkit/auto-animate',
    'nuxt-icon',
    '@vite-pwa/nuxt',
    'nuxt-typed-router',
    'nuxt-schema-org',
  ],
  runtimeConfig: {
    MONGODB_URL: process.env.MONGODB_URL,

    KUN_GALGAME_API: process.env.KUN_GALGAME_API,

    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,

    JWT_ISS: process.env.JWT_ISS,
    JWT_AUD: process.env.JWT_AUD,
    JWT_SECRET: process.env.JWT_SECRET,

    public: {
      KUN_GALGAME_URL: process.env.KUN_GALGAME_URL,
    },
  },

  // Frontend
  css: ['@/assets/css/index.scss'],
  vite: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: '~/language/i18n.ts',
  },
})
