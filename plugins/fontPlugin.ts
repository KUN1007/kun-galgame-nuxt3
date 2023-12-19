export default defineNuxtPlugin((nuxtApp) => {
  const { showKUNGalgameFontStyle } = useKUNGalgameSettingsStore()
  if (process.client) {
    document.documentElement.style.setProperty(
      '--font-family',
      showKUNGalgameFontStyle
    )
  }
})
