<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const ReplyPanel = defineAsyncComponent(
  () => import('~/components/topic/reply/Panel.vue')
)

const topic = ref<TopicDetail>()
const route = useRoute()
const isBanned = ref(false)
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})

const { data } = await useFetch(`/api/topic/${tid.value}`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler
})

if (data.value === 'banned') {
  isBanned.value = true
} else {
  topic.value = data.value ?? undefined
}

const topicContentText = computed(() =>
  markdownToText(topic.value?.content ?? '')
    .trim()
    .replace(/\s+/g, ',')
    .slice(0, 150)
)

useHead({
  title: topic.value?.title,
  meta: [
    {
      name: 'description',
      content: topicContentText.value
    },
    {
      name: 'keywords',
      content: topic.value?.tags.toString()
    }
  ]
})
</script>

<template>
  <div class="root">
    <ReplyPanel />

    <Topic v-if="topic" :tid="tid" :topic-data="topic" />

    <KunBlank v-if="!topic && !isBanned">
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
  min-height: calc(100dvh - 75px);
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
}
</style>
