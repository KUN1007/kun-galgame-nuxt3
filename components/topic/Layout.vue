<script setup lang="ts">
import type { TopicCard } from '~/types/api/topic'

defineProps<{
  topics: TopicCard[]
}>()

const { layout } = storeToRefs(usePersistKUNGalgameTopicStore())
</script>

<template>
  <div
    class="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4"
    v-if="layout === 'grid'"
  >
    <TopicCard
      v-for="(kun, index) in topics"
      :key="index"
      class="item"
      :topic="kun"
    />
  </div>

  <div :class="layout" v-if="layout === 'list'">
    <div v-for="(topic, index) in topics" :key="index">
      <HomeTopicCard :topic="topic" />
      <KunDivider margin="0 7px" color="var(--kungalgame-trans-blue-1)" />
    </div>
  </div>
</template>
