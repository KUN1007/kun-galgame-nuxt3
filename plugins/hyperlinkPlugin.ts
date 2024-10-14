export default defineNuxtPlugin((_) => {
  const { showKUNGalgameFontStyle } = usePersistSettingsStore()
  if (import.meta.client) {
    document.documentElement.style.setProperty(
      '--font-family',
      showKUNGalgameFontStyle
    )
  }
})
