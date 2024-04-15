export const getPreferredLanguageText = (
  language: KunLanguage,
  locale: Language
) => {
  if (locale === 'en-us') {
    return language['en-us'] || language['ja-jp'] || language['zh-cn']
  } else if (locale === 'ja-jp') {
    return language['ja-jp'] || language['en-us'] || language['zh-cn']
  } else if (locale === 'zh-cn') {
    return language['zh-cn'] || language['ja-jp'] || language['en-us']
  } else {
    return ''
  }
}
