export interface KUNGalgameSettingsStore {
  showKUNGalgameMode: '' | 'dark'
  showKUNGalgameLanguage: 'en' | 'zh'
  showKUNGalgamePageWidth: Record<string, number>
  showKUNGalgameFontStyle: string
  showKUNGalgameBackground: string
  showKUNGalgameCustomBackground: string

  isShowPageWidth: boolean
}
