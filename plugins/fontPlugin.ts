export default defineNuxtPlugin((nuxtApp) => {
  const { showKUNGalgameFontStyle } = usePersistSettingsStore()
  if (process.client) {
    document.documentElement.style.setProperty(
      '--font-family',
      showKUNGalgameFontStyle
    )
  }
})
