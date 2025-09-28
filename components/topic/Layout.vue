<script setup lang="ts">
import type { TopicCard } from '~/types/api/topic'

defineProps<{
  topics: TopicCard[]
}>()

const { layout } = storeToRefs(usePersistKUNGalgameTopicStore())
</script>

<template>
  <div class="contents">
    <div
      class="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-3"
      v-if="layout === 'grid'"
    >
      <TopicCard
        v-for="(kun, index) in topics"
        :key="index"
        class="item"
        :topic="kun"
      />
    </div>

    <div class="space-y-3" v-if="layout === 'list'">
      <KunCard
        :is-transparent="false"
        v-for="(topic, index) in topics"
        :key="index"
      >
        <HomeTopicCard :topic="topic" />
      </KunCard>
    </div>
  </div>
</template>
