<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const props = defineProps<{
  topic: HomeTopic
}>()

const topic = computed(() => props.topic)
</script>

<template>
  <div class="container">
    <NuxtLinkLocale :to="`/topic/${topic.tid}`">
      <HomeContentTopicPart :topic="topic" />
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  flex-shrink: 0;
  border-radius: 10px;
  display: flex;
  border: 2px solid var(--kungalgame-trans-blue-2);

  &:hover {
    border: 2px solid var(--kungalgame-blue-5);
  }

  &:last-child {
    margin-bottom: 0;
  }

  a {
    width: 100%;
    padding: 10px;
  }
}
</style>
