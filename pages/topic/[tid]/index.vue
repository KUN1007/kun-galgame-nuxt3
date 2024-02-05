<script setup lang="ts">
const ReplyPanel = defineAsyncComponent(
  () => import('~/components/topic/reply/Panel.vue')
)

const route = useRoute()
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})

const { data } = await useFetch(`/api/topic/${tid.value}`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler,
})

const topicContentText = computed(() =>
  markdownToText(data.value?.content ?? '')
    .trim()
    .replace(/\s+/g, ',')
    .slice(0, 150)
)

useHead({
  title: data.value?.title,
  meta: [
    {
      name: 'description',
      content: topicContentText.value,
    },
    {
      name: 'keywords',
      content: data.value?.tags.toString(),
    },
  ],
})
</script>

<template>
  <div class="root">
    <ReplyPanel />

    <Topic v-if="data" :tid="tid" :topic-data="data" />

    <TopicBar />
  </div>
</template>

<style lang="scss" scoped>
.root {
  min-height: calc(100vh - 65px);
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
}
</style>
