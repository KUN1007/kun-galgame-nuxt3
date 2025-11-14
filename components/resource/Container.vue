<script setup lang="ts">
import { useTopic } from '~/composables/topic/useTopic'

const {
  topics,
  isLoadingComplete,
  isFetching,
  resetTopics,
  loadInitialTopics
} = useTopic('resource')

await loadInitialTopics()

const handleFilterChange = async () => {
  await resetTopics()
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-lg">
    <KunCard :is-hoverable="false" :is-transparent="false">
      <KunHeader
        name="资源和求助话题列表"
        description="有关于 Galgame 下载资源, Galgame 和技术相关求助的话题列表"
        scale="h1"
      />
    </KunCard>

    <TopicTool @filter-change="handleFilterChange" />

    <div class="space-y-3">
      <KunCard
        :is-transparent="false"
        v-for="(topic, index) in topics"
        :key="index"
      >
        <HomeTopicCard :topic="topic" />
      </KunCard>
    </div>

    <div class="flex w-full items-center justify-center p-6">
      <KunLoading v-if="isFetching" description="正在摸鱼中...咕咕咕" />

      <KunNull v-if="isLoadingComplete" description="真的一滴也不剩了呜呜呜" />
    </div>
  </div>
</template>
