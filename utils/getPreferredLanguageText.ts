export const getPreferredLanguageText = (
  language: KunLanguage,
  locale: Language
): string => {
  const languagePriority: Record<Language, Language[]> = {
    'en-us': ['en-us', 'ja-jp', 'zh-tw', 'zh-cn'],
    'ja-jp': ['ja-jp', 'en-us', 'zh-tw', 'zh-cn'],
    'zh-cn': ['zh-cn', 'zh-tw', 'ja-jp', 'en-us'],
    'zh-tw': ['zh-tw', 'zh-cn', 'ja-jp', 'en-us']
  }

  const priorities = languagePriority[locale]

  for (const lang of priorities) {
    if (language[lang]) {
      return language[lang]
    }
  }

  return ''
}
