<script setup lang="ts">
const { locale, t } = useI18n()
const colorMode = useColorMode()
const { showKUNGalgamePageTransparency, showKUNGalgameBackgroundBlur } =
  storeToRefs(usePersistSettingsStore())

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  link: [
    {
      rel: 'alternative',
      href: `https://www.kungal.com/rss/topic.xml?locale=${locale.value}`,
      type: 'application/rss+xml',
      title: t('head.topicRSS')
    },
    {
      rel: 'feed',
      href: `https://www.kungal.com/rss/topic.xml?locale=${locale.value}`,
      type: 'application/rss+xml',
      title: t('head.topicRSS')
    },
    {
      rel: 'alternative',
      href: `https://www.kungal.com/rss/galgame.xml?locale=${locale.value}`,
      type: 'application/rss+xml',
      title: t('head.galgameRSS')
    },
    {
      rel: 'feed',
      href: `https://www.kungal.com/rss/galgame.xml?locale=${locale.value}`,
      type: 'application/rss+xml',
      title: t('head.galgameRSS')
    },
    {
      rel: 'me',
      href: `https://mastodon.social/@kungal`,
      type: 'text/html',
      title: 'Mastodon'
    }
  ]
})

useSchemaOrg([
  defineOrganization({
    name: t('head.name'),
    url: 'https://kungal.com',
    sameAs: ['https://github.com/KUNGalgame']
  }),
  defineWebSite({ name: t('head.name') }),
  defineWebPage()
])

onMounted(() => {
  usePersistSettingsStore().setKUNGalgameTransparency(
    showKUNGalgamePageTransparency.value,
    colorMode.value as 'dark' | 'light'
  )

  usePersistSettingsStore().setKUNGalgameBackgroundBlur(
    showKUNGalgameBackgroundBlur.value
  )

  // Disable pinia console info for dev
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem(
      '__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__dev.esm.pinia__',
      '{"logStoreChanges":false}'
    )
  }
})
</script>

<template>
  <!-- Global alert component -->
  <KunAlert />

  <!-- Global info component -->
  <KunAlertInfo />

  <!-- Global capture component -->
  <KunCapture />

  <!-- Global Clip component -->
  <KunClipper />

  <!-- ReplyPanel -->
  <LazyTopicReplyPanel />

  <NuxtPwaManifest />
  <NuxtLoadingIndicator color="var(--kungalgame-blue-5)" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
