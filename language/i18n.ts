import zh from './zh.json'
import en from './en.json'

export default defineI18nConfig(() => ({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    en,
    zh,
  },
}))
