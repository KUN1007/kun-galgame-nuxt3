<script setup lang="ts">
const route = useRoute()

const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())

const isBanned = ref(false)
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})
provide<number>('tid', tid.value)

const data = await useFetch(`/api/topic/${tid.value}`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler
}).then(({ data }) => {
  if (data.value === 'banned') {
    isBanned.value = true
    return null
  } else {
    return data.value
  }
})

const resetPanelStatus = () => {
  isEdit.value = false
  isShowAdvance.value = false
}

onBeforeRouteLeave(async (_, __, next) => {
  if (isReplyRewriting.value) {
    const res =
      await useComponentMessageStore().alert(
        '确认离开界面吗？您的更改将不会保存。'
      )
    if (res) {
      useTempReplyStore().resetRewriteReplyData()
      resetPanelStatus()
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
  isEdit.value = false
  isShowAdvance.value = false
})

onBeforeMount(() => {
  resetPanelStatus()
})

const getFirstImageSrc = (htmlString: string) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/i
  const match = htmlString.match(imgRegex)

  return match ? match[1] : 'https://www.kungal.com/kungalgame.webp'
}

if (data) {
  const content = computed(() =>
    markdownToText(data.markdown).trim().replace(/\s+/g, ',').slice(0, 233)
  )

  useHead({
    title: `${data.title} - ${kungal.titleShort}`,
    meta: [
      {
        name: 'description',
        content: content.value
      },
      {
        name: 'keywords',
        content: data.tags.toString()
      },
      {
        name: 'og:title',
        content: `${data.title} - ${kungal.titleShort}`
      },
      {
        name: 'og:description',
        content: content.value
      },
      {
        property: 'og:image',
        content: getFirstImageSrc(data.content)
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'og:url',
        content: useRequestURL().href
      },
      {
        property: 'twitter:card',
        content: content.value
      },
      {
        name: 'twitter:title',
        content: `${data.title} - ${kungal.titleShort}`
      },
      {
        name: 'twitter:description',
        content: content.value
      },
      {
        property: 'twitter:url',
        content: useRequestURL().href
      },
      {
        property: 'twitter:image',
        content: getFirstImageSrc(data.content)
      }
    ]
  })
}
</script>

<template>
  <div class="root">
    <TopicDetail v-if="data" :tid="tid" :topic="data" />

    <KunNull :condition="!data && !isBanned" type="404" />

    <KunBlank v-if="isBanned">此话题已被封禁</KunBlank>

    <TopicDetailBar />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}
</style>
