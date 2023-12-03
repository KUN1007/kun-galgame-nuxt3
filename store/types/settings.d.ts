// Settings panel configuration
export interface KUNGalgameSettingsStore {
  // Day and night mode toggle
  showKUNGalgameMode: '' | 'dark'
  // Website display language
  showKUNGalgameLanguage: 'en' | 'zh'
  // Main page width
  showKUNGalgamePageWidth: Record<string, number>
  // Website font style
  showKUNGalgameFontStyle: string
  // Background image
  showKUNGalgameBackground: string
  // Custom background image
  showKUNGalgameCustomBackground: string

  // Whether to display page width or font settings
  isShowPageWidth: boolean
}
