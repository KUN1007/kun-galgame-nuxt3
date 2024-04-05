<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const topic = ref<TopicDetail>()
const route = useRoute()
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
  topic.value = data.value ?? undefined
}

// useHead({
//   title: topic.value?.title,
//   meta: [
//     {
//       name: 'description',
//       content: topicContentText.value
//     },
//     {
//       name: 'keywords',
//       content: topic.value?.tags.toString()
//     }
//   ]
// })
</script>

<template>
  <div class="root">
    <Topic v-if="topic" :tid="tid" :topic-data="topic" />

    <KunBlank info="topic.notFound" v-if="!topic && !isBanned" />

    <KunBlank info="topic.banned" v-if="isBanned" />

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
