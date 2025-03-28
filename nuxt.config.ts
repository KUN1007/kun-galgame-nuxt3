import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

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

  compatibilityDate: '2024-11-01',

  devServer: {
    host: '127.0.0.1',
    port: 1007
  },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-schema-org',
    'nuxt-umami'
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

  umami: {
    id: process.env.KUN_VISUAL_NOVEL_FORUM_UMAMI_ID,
    host: 'https://stats.kungal.org/',
    autoTrack: true
  },

  // Frontend
  css: ['~/styles/index.css'],

  icon: {
    mode: 'svg',
    clientBundle: {
      scan: true,
      sizeLimitKb: 256
    }
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        }
      }
    }
  },

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
