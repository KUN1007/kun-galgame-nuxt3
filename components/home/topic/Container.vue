<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

defineProps<{
  topics: HomeTopic[]
}>()
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
  >
    <div class="flex items-center gap-3">
      <h2 class="text-xl font-semibold">最新话题</h2>
      <KunLink
        underline="none"
        class-name="text-default-500 hover:text-primary text-sm transition-colors"
        to="/topic"
      >
        查看更多 >
      </KunLink>
    </div>

    <template v-for="(topic, index) in topics" :key="index">
      <HomeTopicCard :topic="topic" :is-transparent="true" />
    </template>
  </KunCard>
</template>
