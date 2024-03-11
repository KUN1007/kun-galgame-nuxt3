<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

const props = defineProps<{
  topic: PoolTopic
}>()

const actionsCount = computed(() => props.topic.replies + props.topic.comments)
</script>

<template>
  <NuxtLinkLocale class="topic" :to="`/topic/${props.topic.tid}`">
    <div class="title">
      {{ topic.title }}
    </div>

    <PoolUser :user="props.topic.user" :time="props.topic.time" />

    <PoolIntroduction
      :category="props.topic.category"
      :tags="props.topic.tags"
    />

    <div class="status">
      <span>
        <Icon name="ic:outline-remove-red-eye" />
        {{ props.topic.views }}
      </span>

      <span>
        <Icon name="ic:outline-remove-red-eye" />
        {{ props.topic.views }}
      </span>

      <span>
        <Icon name="ri:reply-line" />
        {{ actionsCount }}
      </span>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.topic {
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--shadow);
  cursor: pointer;
  max-width: 300px;
  padding: 10px;
  border: 2px solid var(--kungalgame-trans-blue-2);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  background-color: var(--kungalgame-trans-white-5);

  &:hover {
    border: 2px solid var(--kungalgame-blue-5);
  }
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
  margin-bottom: 10px;
  font-weight: bold;
  color: var(--kungalgame-blue-5);
  flex-shrink: 0;
}

.status {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  overflow: hidden;
  flex-wrap: wrap;
  margin: 10px 0;

  span {
    display: flex;
    align-items: center;
  }
}
</style>
