<script setup lang="ts">
import { useTopic } from '~/composables/topic/useTopic'

const {
  topics,
  isLoadingComplete,
  isFetching,
  loadMoreTopics,
  resetTopics,
  loadInitialTopics
} = useTopic()

// Load initial data
await loadInitialTopics()

// Handle filter changes from TopicTool
const handleFilterChange = async () => {
  await resetTopics()
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-lg">
    <TopicTool @filter-change="handleFilterChange" />

    <TopicLayout :topics="topics" />

    <div class="w-full items-center justify-center p-6">
      <KunButton
        size="lg"
        v-if="!isLoadingComplete"
        :disabled="isFetching"
        @click="loadMoreTopics"
      >
        {{ isFetching ? '加载中...' : '点击继续加载话题' }}
      </KunButton>

      <p v-if="isLoadingComplete" class="text-default-500">
        已经。。。一滴也不剩了
      </p>
    </div>
  </div>
</template>
