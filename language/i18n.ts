import { KUNGalgameLanguage } from '~/utils/getDefaultEnv'

import zh from './zh'
import en from './en'

export default defineI18nConfig(() => ({
  locale: KUNGalgameLanguage(),
  legacy: false,
  globalInjection: true,
  messages: {
    en,
    zh,
  },
}))
