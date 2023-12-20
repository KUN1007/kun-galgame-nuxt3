<script setup lang="ts">
import { computed } from 'vue'
import UserPart from './UserPart.vue'
import TopicPart from './TopicPart.vue'

import { HomeTopic } from '@/api'

const props = defineProps<{
  topic: HomeTopic
}>()

const topic = computed(() => props.topic)
</script>

<template>
  <div class="topic">
    <UserPart :user="topic.user" />

    <RouterLink :to="`/topic/${topic.tid}`">
      <TopicPart :topic="topic" />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.topic {
  width: 100%;
  height: 77px;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: var(--kungalgame-trans-blue-0);
  display: flex;
  flex-shrink: 0;

  &:hover {
    background-color: var(--kungalgame-white);
    box-shadow: var(--kungalgame-shadow-1);
    transition: 0.2s;
  }

  &:last-child {
    margin-bottom: 0;
  }

  /** Width is the total width of a single topic minus the width of the user part
      Here it's 2 + 5 + 60 + 5 + 2 = 74px */
  a {
    width: calc(100% - 74px);
    padding: 7px 0;
  }
}
</style>
