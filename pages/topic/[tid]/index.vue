<script setup lang="ts">
const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())
const { isShowCommentPanelRid } = storeToRefs(useTempCommentStore())

const route = useRoute()
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

if (data) {
  const content = computed(() =>
    markdownToText(data.content).trim().replace(/\s+/g, ',').slice(0, 150)
  )

  useHead({
    title: data.title,
    meta: [
      {
        name: 'description',
        content: content.value
      },
      {
        name: 'keywords',
        content: data.tags.toString()
      }
    ]
  })
}

const resetPanelStatus = () => {
  isShowCommentPanelRid.value = 0
  isEdit.value = false
  isShowAdvance.value = false
}

onBeforeRouteLeave(async (_, __, next) => {
  if (isReplyRewriting.value) {
    const res = await useTempMessageStore().alert({
      'en-us': 'Confirm leaving the page? Your changes will not be saved.',
      'ja-jp': '',
      'zh-cn': '确认离开界面吗？您的更改将不会保存'
    })
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
</script>

<template>
  <div class="root">
    <Topic v-if="data" :tid="tid" :topic="data" />

    <KunBlank v-if="!data">
      {{ $t('topic.notFound') }}
    </KunBlank>

    <KunBlank v-if="isBanned">
      {{ $t('topic.banned') }}
    </KunBlank>

    <TopicBar />
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
}
</style>
