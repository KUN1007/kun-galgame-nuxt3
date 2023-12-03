// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
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
    public: {
      kungalgameUrl: 'https://www.kungal.com',
    },
  },
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
