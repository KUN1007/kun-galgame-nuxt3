<script setup lang="ts">
const route = useRoute()

const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())

const topicId = computed(() => {
  return parseInt((route.params as { id: string }).id)
})
provide<number>('topicId', topicId.value)

const { data } = await useFetch(`/api/topic/${topicId.value}`, {
  method: 'GET',
  watch: false,
  query: { topicId: topicId.value },
  ...kungalgameResponseHandler
})

onBeforeRouteLeave(async (_, __, next) => {
  if (isReplyRewriting.value) {
    const res =
      await useComponentMessageStore().alert(
        '确认离开界面吗？您的更改将不会保存。'
      )
    if (res) {
      useTempReplyStore().resetRewriteReplyData()
      isEdit.value = false
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
  isEdit.value = false
})

onBeforeMount(() => {
  isEdit.value = false
})

const getFirstImageSrc = (htmlString: string) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/i
  const match = htmlString.match(imgRegex)

  return match ? match[1] : 'https://www.kungal.com/kungalgame.webp'
}

if (data.value && data.value !== 'banned') {
  const markdown = data.value.contentMarkdown
  const banner = getFirstImageSrc(data.value.contentHtml)
  const created = new Date(data.value.created).toString()
  const updated = data.value.edited
    ? new Date(data.value.edited).toString()
    : ''
  const description = computed(() =>
    markdownToText(markdown).trim().slice(0, 233).replace(/\\|\n/g, '')
  )

  useHead({
    link: [
      {
        rel: 'canonical',
        href: `${kungal.domain.main}/topic/${data.value.id}`
      }
    ]
  })

  useKunSeoMeta({
    title: data.value.title,
    description: description.value,

    ogImage: banner,
    ogUrl: `${kungal.domain.main}/topic/${data.value.id}`,
    ogType: 'article',

    twitterImage: banner,
    twitterCard: 'summary_large_image',

    articleAuthor: [`${kungal.domain.main}/user/${data.value.user.id}/info`],
    articlePublishedTime: created,
    articleModifiedTime: updated
  })
} else {
  useHead({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }]
  })
  useKunSeoMeta({
    title: data.value ? '话题已被封禁' : '未找到此话题',
    description: data.value
      ? `这个话题由于违反了 ${kungal.titleShort} 话题发布规定, 或者该话题被作者删除, 您可以返回话题页面查看其它话题`
      : `未找到这个话题, 请确认您的请求路径是否正确, 您可以返回话题页面查看其它话题`
  })
}
</script>

<template>
  <div>
    <TopicDetail v-if="data && data !== 'banned'" :topic="data" />

    <KunNull v-if="!data && data !== 'banned'" description="未找到这个话题" />

    <KunNull v-if="data === 'banned'" description="此话题已被封禁" />
  </div>
</template>
