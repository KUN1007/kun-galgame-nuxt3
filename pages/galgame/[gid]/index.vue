<script setup lang="ts">
const route = useRoute()

const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data } = await useFetch(`/api/galgame/${gid.value}`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler
})

if (data.value && data.value !== 'banned') {
  const titleBase = getPreferredLanguageText(data.value.name)
  const title = titleBase.concat(
    titleBase !== data.value.name['ja-jp'] && data.value.name['ja-jp']
      ? ` | ${data.value.name['ja-jp']}`
      : ''
  )
  const description = markdownToText(
    getPreferredLanguageText(data.value.introduction)
  )

  const keywords =
    Object.values(data.value.name).join(', ') +
    ', ' +
    data.value.alias.toString()

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
        content: data.value.banner
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
        content: data.value.banner
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
  <div>
    <Galgame v-if="data && data !== 'banned'" :galgame="data" />
    <KunNull
      v-if="!data && data !== 'banned'"
      description="未找到这个 Galgame"
    />
    <KunBlank v-if="data === 'banned'">此 Galgame 已被封禁</KunBlank>
  </div>
</template>
