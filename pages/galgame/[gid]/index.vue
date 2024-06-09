<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const { t, locale } = useI18n()
const route = useRoute()

const galgame = ref<GalgameDetail>()
const isBanned = ref(false)
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data } = await useFetch(`/api/galgame/${gid.value}`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler
})

if (data.value === 'banned') {
  isBanned.value = true
} else {
  galgame.value = data.value ?? undefined
}

if (galgame.value) {
  const title = Object.values(galgame.value.name)
    .filter((val) => val !== '')
    .join(' | ')
  const description = markdownToText(
    getPreferredLanguageText(
      galgame.value.introduction,
      locale.value as Language
    )
  )
  const platforms = galgame.value.platform
    .map((p) => t(`galgame.resource.platform.${p}`))
    .join(', ')
    .toString()
  const languages = galgame.value.language
    .map((l) => t(`galgame.resource.language.${l}`))
    .join(', ')
    .toString()
  const descriptionMeta = `${t('seo.galgame.support')} ${languages} | ${platforms} ${t('seo.galgame.download')} - ${description.slice(0, 233)}`

  const keywords =
    Object.values(galgame.value.name).join(', ') +
    ', ' +
    galgame.value.alias.toString()

  useHead({
    title,
    htmlAttrs: {
      lang: locale.value
    },
    meta: [
      {
        name: 'description',
        content: descriptionMeta
      },
      {
        name: 'keywords',
        content: keywords
      },
      {
        name: 'og:title',
        content: title
      },
      {
        name: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: galgame.value.banner
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: useRequestURL().href
      },
      {
        property: 'twitter:card',
        content: description
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      },
      {
        property: 'twitter:image',
        content: galgame.value.banner
      },
      {
        property: 'twitter:url',
        content: useRequestURL().href
      }
    ]
  })
}
</script>

<template>
  <div class="root">
    <Galgame v-if="galgame" :galgame="galgame" />

    <KunBlank v-if="!galgame && !isBanned">
      {{ $t('galgame.notFound') }}
    </KunBlank>

    <KunBlank v-if="isBanned">
      {{ $t('galgame.banned') }}
    </KunBlank>
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
  color: var(--kungalgame-font-color-3);
  padding: 17px;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  will-change: transform;
  border-radius: 10px;
  box-shadow: var(--shadow);
}
</style>
