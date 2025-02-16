<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

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
  const titleBase = galgame.value.name['zh-cn']
  const title = titleBase
    .concat(
      titleBase !== galgame.value.name['ja-jp'] && galgame.value.name['ja-jp']
        ? ` | ${galgame.value.name['ja-jp']}`
        : ''
    )
    .concat(` - ${kungal.titleShort}`)
  const description = markdownToText(galgame.value.introduction['zh-cn'])

  const keywords =
    Object.values(galgame.value.name).join(', ') +
    ', ' +
    galgame.value.alias.toString()

  useHead({
    title,
    meta: [
      {
        name: 'description',
        content: description
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

    <KunNull :condition="!galgame && !isBanned" type="404" />

    <KunBlank v-if="isBanned">此 Galgame 已被封禁</KunBlank>
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 17px;

  @include kun-blur;
}
</style>
