<script setup lang="ts">
const { locale } = useI18n()
const colorMode = useColorMode()
const { showKUNGalgamePageTransparency } = storeToRefs(
  useKUNGalgameSettingsStore()
)

useHead({
  htmlAttrs: {
    lang: locale.value
  }
})

useSchemaOrg([
  defineOrganization({
    name: 'KUN Visual Novel',
    url: 'https://kungal.com',
    sameAs: ['https://github.com/KUNGalgame']
  }),
  defineWebSite({ name: 'KUN Visual Novel' }),
  defineWebPage()
])

onMounted(() => {
  useKUNGalgameSettingsStore().setKUNGalgameTransparency(
    showKUNGalgamePageTransparency.value,
    colorMode.value as 'dark' | 'light'
  )
})
</script>

<template>
  <!-- Global alert component -->
  <KunAlert />

  <!-- Global info component -->
  <KunAlertInfo />

  <!-- Global capture component -->
  <KunCapture />

  <!-- Global search component -->
  <KunSearch />

  <NuxtPwaManifest />
  <NuxtLoadingIndicator color="var(--kungalgame-blue-5)" />

  <KunLayout>
    <NuxtPage />
  </KunLayout>
</template>
