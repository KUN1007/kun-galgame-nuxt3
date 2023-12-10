<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const config = useRuntimeConfig()

const { showKUNGalgameLanguage, showKUNGalgameMode, showKUNGalgameFontStyle } =
  storeToRefs(useKUNGalgameSettingsStore())
const i18n = useNuxtApp().$i18n

useHead({
  title: t('head.title'),
  htmlAttrs: {
    lang: showKUNGalgameLanguage.value,
  },
  meta: [
    {
      name: 'description',
      content: t('head.description'),
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'og:title',
      content: t('head.title'),
    },
    {
      name: 'og:description',
      content: t('head.description'),
    },
    {
      property: 'og:image',
      content: '/kungalgame.webp',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: config.public.KUN_GALGAME_URL,
    },
    {
      property: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: t('head.title'),
    },
    {
      name: 'twitter:description',
      content: t('head.description'),
    },
    {
      property: 'twitter:image',
      content: '/kungalgame.webp',
    },
    {
      property: 'twitter:url',
      content: config.public.KUN_GALGAME_URL,
    },
  ],
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
  ],
})

useSchemaOrg([
  defineOrganization({
    name: 'KUN Visual Novel',
    url: 'https://kungal.com',
    sameAs: ['https://github.com/KUNGalgame'],
  }),
  defineWebSite({ name: 'KUN Visual Novel' }),
  defineWebPage(),
])

onBeforeMount(() => {
  const theme = showKUNGalgameMode.value
  const font = showKUNGalgameFontStyle.value

  if (theme) {
    document.documentElement.className = theme
  }
  if (font) {
    document.documentElement.style.fontFamily = font
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

  <!-- Global search component -->
  <!-- <SearchKUNGalgameSearchBox /> -->

  <NuxtLoadingIndicator />
  <NuxtLayout name="nav">
    <NuxtPage />
  </NuxtLayout>
</template>
