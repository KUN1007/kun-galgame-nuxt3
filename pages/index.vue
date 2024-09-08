<script setup lang="ts">
const { t, locale } = useI18n()

const config = useRuntimeConfig()
useHead({
  title: t('head.name'),
  htmlAttrs: {
    lang: locale.value
  },
  meta: [
    {
      name: 'description',
      content: t('seo.home.description')
    },
    {
      name: 'keywords',
      content: t('head.keywords')
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    },
    {
      name: 'og:title',
      content: t('head.name')
    },
    {
      name: 'og:description',
      content: t('head.description')
    },
    {
      property: 'og:image',
      content: '/kungalgame.webp'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: config.public.KUN_GALGAME_URL
    },
    {
      property: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: t('head.name')
    },
    {
      name: 'twitter:description',
      content: t('head.description')
    },
    {
      property: 'twitter:image',
      content: '/kungalgame.webp'
    },
    {
      property: 'twitter:url',
      content: config.public.KUN_GALGAME_URL
    },
    {
      name: 'theme-color',
      content: '#218bff'
    }
  ],
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png'
    }
  ]
})
</script>

<template>
  <div class="root">
    <HomeContainer />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 64rem;
  margin: 0 auto;
  padding: 17px;

  @include kun-blur;
}

@media (max-width: 1000px) {
  .root {
    min-height: calc(100dvh - 65px);
    padding: 17px 10px;
  }
}
</style>
