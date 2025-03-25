<script setup lang="ts">
const route = useRoute()

const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())

const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})
provide<number>('tid', tid.value)

const { data } = await useFetch(`/api/topic/${tid.value}`, {
  method: 'GET',
  watch: false,
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
  const markdown = data.value.markdown
  const banner = getFirstImageSrc(data.value.content)
  const created = new Date(data.value.time).toString()
  const updated = new Date(data.value.edited).toString()
  const description = computed(() =>
    markdownToText(markdown).trim().slice(0, 233).replace(/\\|\n/g, '')
  )

  useKunSeoMeta({
    title: data.value.title,
    description,

    ogImage: banner,
    ogUrl: `${kungal.domain.main}/topic/${data.value.tid}`,
    ogType: 'article',

    twitterImage: banner,
    twitterCard: 'summary_large_image',

    articleAuthor: [`${kungal.domain.main}/user/${data.value.user.uid}/info`],
    articlePublishedTime: created,
    articleModifiedTime: updated
  })
} else {
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
