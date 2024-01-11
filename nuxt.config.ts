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
    '@nuxtjs/color-mode',
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
  imports: {
    dirs: ['./composables', './utils', './store/**/*.ts'],
  },

  // Frontend
  css: ['~/assets/css/index.scss'],
  vite: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
  piniaPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  i18n: {
    langDir: './language',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'kungalgame-language',
      redirectOn: 'root',
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__KUNGALGAME_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: 'kun-',
    classSuffix: '-mode',
    storageKey: 'kungalgame-color-mode',
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'KUN Visual Novel PWA',
      short_name: 'KunPWA',
      theme_color: '#218bff',
      icons: [
        {
          src: 'pwa/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,png,webp,svg,ico}'],
      navigateFallback: null,
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
})
