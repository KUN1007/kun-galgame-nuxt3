<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { KUNGalgameLanguage } from '~/utils/getDefaultEnv'

const { tm } = useI18n()

const config = useRuntimeConfig()

useHead({
  title: tm('head.title'),
  htmlAttrs: {
    lang: KUNGalgameLanguage(),
  },
  meta: [
    {
      name: 'description',
      content: tm('head.description'),
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'og:title',
      content: tm('head.title'),
    },
    {
      name: 'og:description',
      content: tm('head.description'),
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
      content: tm('head.title'),
    },
    {
      name: 'twitter:description',
      content: tm('head.description'),
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
</script>

<template>
  <!-- Global alert component -->
  <Alert />

  <!-- Global info component -->
  <AlertInfo />

  <!-- Global capture component -->
  <Capture />

  <!-- Global search component -->
  <!-- <SearchKUNGalgameSearchBox /> -->

  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
