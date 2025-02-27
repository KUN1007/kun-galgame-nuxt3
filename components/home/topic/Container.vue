<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const topicData = ref<HomeTopic[] | null>()
const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, status } = await useFetch(`/api/home/topic`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
topicData.value = data.value

watch(
  () => [pageData.page, status.value],
  () => {
    if (data.value && status.value !== 'pending' && pageData.page > 1) {
      topicData.value = topicData.value?.concat(data.value)
    }
  }
)
</script>

<template>
  <div class="space-y-3" v-if="topicData">
    <div class="flex items-center gap-3">
      <h2 class="text-xl font-semibold">最新话题</h2>
      <NuxtLink class="text-default-600 hover:text-primary text-sm" to="/topic">
        查看更多 >
      </NuxtLink>
    </div>

    <template v-for="(topic, index) in topicData" :key="index">
      <HomeTopicCard :topic="topic" />
    </template>
  </div>
</template>
