<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

defineProps<{
  topics: PoolTopic[]
}>()

const { layout } = storeToRefs(usePersistPoolStore())
</script>

<template>
  <div :class="layout" v-if="layout === 'grid'">
    <PoolTopic
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

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 10px;
  @include kun-blur;
}

.list {
  padding: 10px;
  @include kun-blur;
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: repeat(2, minmax(100px, 233px));
    padding: 10px 0;
  }
}
</style>
