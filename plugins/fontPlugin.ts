export default defineNuxtPlugin((_) => {
  const { showKUNGalgameFontStyle } = usePersistSettingsStore()
  if (process.client) {
    document.documentElement.style.setProperty(
      '--font-family',
      showKUNGalgameFontStyle
    )
  }
})
