<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { topicIconMap } from './navSortItem'
import type { RankingTopics } from '@/api'

const props = defineProps<{
  field: string
  topics: RankingTopics[]
}>()

const topics = computed(() => props.topics)

// Convert the incoming data to numbers
const parseTopicNumber = (field: string | string[]) => {
  return Array.isArray(field) ? field.length : Math.ceil(parseInt(field))
}
</script>

<template>
  <TransitionGroup name="list">
    <div class="single-topic" v-for="topic in topics" :key="topic.tid">
      <RouterLink :to="`/topic/${topic.tid}`">
        <div class="topic-name">
          {{ topic.title }}
        </div>

        <div class="detail">
          <Icon :icon="topicIconMap[props.field]" />
          <span>{{ parseTopicNumber(topic.field) }}</span>
        </div>
      </RouterLink>
    </div>
  </TransitionGroup>
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
    border: 1px solid var(--kungalgame-trans-blue-2);
    border-radius: 5px;
    color: var(--kungalgame-font-color-3);
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      transition: all 0.5s;
      background-color: var(--kungalgame-trans-white-9);
      border: 1px solid var(--kungalgame-blue-4);
      color: var(--kungalgame-blue-4);
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
  color: var(--kungalgame-blue-4);

  span {
    color: var(--kungalgame-font-color-3);
    margin-left: 10px;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
