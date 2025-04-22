<script setup lang="ts">
import { useTopic } from '~/composables/topic/useTopic'

const {
  topics,
  isLoadingComplete,
  isFetching,
  resetTopics,
  loadInitialTopics
} = useTopic()

await loadInitialTopics()

const handleFilterChange = async () => {
  await resetTopics()
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-lg">
    <TopicTool @filter-change="handleFilterChange" />

    <TopicLayout :topics="topics" />

    <div class="flex w-full items-center justify-center p-6">
      <KunLoading v-if="isFetching" description="正在摸鱼中...咕咕咕" />

      <KunNull v-if="isLoadingComplete" description="真的一滴也不剩了呜呜呜" />
    </div>
  </div>
</template>
