<script setup lang="ts">
const colorMode = useColorMode()
const { showKUNGalgamePageTransparency, showKUNGalgameBackgroundBlur } =
  storeToRefs(usePersistSettingsStore())

useHead({
  link: [
    {
      rel: 'alternative',
      href: `https://www.kungal.com/rss/topic.xml`,
      type: 'application/rss+xml',
      title: '鲲 Galgame 论坛话题订阅'
    },
    {
      rel: 'feed',
      href: `https://www.kungal.com/rss/topic.xml`,
      type: 'application/rss+xml',
      title: '鲲 Galgame 论坛话题订阅'
    },
    {
      rel: 'alternative',
      href: `https://www.kungal.com/rss/galgame.xml`,
      type: 'application/rss+xml',
      title: '鲲 Galgame 论坛 Galgame 订阅'
    },
    {
      rel: 'feed',
      href: `https://www.kungal.com/rss/galgame.xml`,
      type: 'application/rss+xml',
      title: '鲲 Galgame 论坛 Galgame 订阅'
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
    name: kungal.titleShort,
    url: kungal.domain.main,
    sameAs: [kungal.github]
  }),
  defineWebSite({ name: kungal.titleShort }),
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
