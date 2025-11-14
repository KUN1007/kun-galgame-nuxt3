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
    class-name="sm:p-6 p-3"
    content-class="space-y-6"
  >
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <h2 class="text-lg sm:text-2xl">最新话题</h2>
        <KunButton size="sm" variant="light" href="/topic">
          查看更多 >
        </KunButton>
      </div>

      <KunLink
        class-name="text-default-500"
        size="sm"
        to="/resource"
        color="default"
        underline="hover"
      >
        资源和求助类话题
      </KunLink>
    </div>

    <template v-for="(topic, index) in topics" :key="index">
      <HomeTopicCard :topic="topic" :is-transparent="true" />
    </template>
  </KunCard>
</template>
