<script setup lang="ts">
import { topicIconMap } from './navSortItem'
import type { TopicSortFieldRanking, RankingTopics } from '~/types/api/ranking'

const props = defineProps<{
  field: TopicSortFieldRanking
  topics: RankingTopics[]
}>()

const topics = computed(() => props.topics)
</script>

<template>
  <div class="single-topic" v-for="topic in topics" :key="topic.tid">
    <NuxtLinkLocale :to="`/topic/${topic.tid}`">
      <div class="topic-name">
        {{ topic.title }}
      </div>

      <div class="detail">
        <Icon class="icon" :name="topicIconMap[props.field]" />
        <span class="title">{{ Math.ceil(topic.field) }}</span>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.single-topic {
  a {
    flex-shrink: 0;
    height: 37px;
    margin: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--kungalgame-trans-blue-0);
    border: 2px solid var(--kungalgame-trans-blue-2);
    border-radius: 5px;
    color: var(--kungalgame-font-color-3);
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      background-color: transparent;
      border: 2px solid var(--kungalgame-blue-5);
    }
  }
}

.topic-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail {
  display: flex;
  align-items: center;
  color: var(--kungalgame-blue-5);

  .icon {
    z-index: -1;
  }

  .title {
    color: var(--kungalgame-font-color-3);
    margin-left: 10px;
  }
}
</style>
