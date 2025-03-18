import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { kungal } from './config/kungal'

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')
)
const appVersion = packageJson.version

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  experimental: {
    scanPageMeta: true
  },

  compatibilityDate: '2024-09-29',

  devServer: {
    host: '127.0.0.1',
    port: 1007
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hans'
      },
      titleTemplate: kungal.titleTemplate,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content: kungal.description
        },
        { name: 'theme-color', content: kungal.themeColor },
        { property: 'og:site_name', content: kungal.titleShort },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: kungal.creator.mention }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: kungal.domain.main }
      ]
    }
  },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt',
    'nuxt-schema-org'
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
      KUN_VISUAL_NOVEL_VERSION: appVersion
    }
  },

  imports: {
    dirs: ['./composables', './config', './utils']
  },

  site: {
    url: process.env.KUN_GALGAME_URL
  },

  // Frontend
  css: ['~/styles/index.css'],

  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      drop: ['console', 'debugger']
    }
  },

  eslint: {
    config: {
      stylistic: false
    }
  },

  // Pinia store functions auto imports
  pinia: {
    storesDirs: ['./store/**']
  },

  piniaPluginPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict'
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__KUNGALGAME_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: 'kun-',
    classSuffix: '-mode',
    storageKey: 'kungalgame-color-mode'
  },

  // Backend
  pwa: {
    registerType: 'autoUpdate',
    // Disable pwa in development environment
    disable: process.env.NODE_ENV === 'development',
    manifest: {
      name: 'KUN Visual Novel',
      short_name: 'KunGal',
      theme_color: '#218bff',
      icons: [
        {
          src: 'pwa/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,png,webp,svg,ico}'],
      navigateFallback: null
    },
    client: {
      installPrompt: true
    }
  },

  nitro: {
    experimental: {
      websocket: true
    }
  }
})
