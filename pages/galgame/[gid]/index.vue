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
    getPreferredLanguageText(data.value.markdown)
  )
    .slice(0, 175)
    .replace(/\\|\n/g, '')

  useKunSeoMeta({
    title,
    description,

    ogImage: data.value.banner,
    ogUrl: useRequestURL().href,
    ogType: 'article',

    twitterImage: data.value.banner,
    twitterCard: 'summary_large_image',

    articleAuthor: [`${kungal.domain.main}/user/${data.value.user.uid}/info`],
    articlePublishedTime: data.value.created.toString(),
    articleModifiedTime: data.value.updated.toString()
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: `${kungal.domain.main}/galgame/${data.value.gid}`
      }
    ]
  })
} else {
  useHead({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }]
  })

  useKunSeoMeta({
    title: data.value
      ? '这个 Galgame 已被封禁'
      : '未找到这个 Galgame 资源 wiki',
    description: data.value
      ? `这个 Galgame 由于违反了 ${kungal.titleShort} 资源发布规定, 或者被作者删除, 您可以进入 Galgame 总览页面查看其它相似 Galgame 资源 wiki`
      : `未找到这个 Galgame, 请确认您的请求路径是否正确, 您可以进入 Galgame 页面查看其它 Galgame`
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
    <KunNull v-if="data === 'banned'" description="此 Galgame 已被封禁" />
  </div>
</template>
